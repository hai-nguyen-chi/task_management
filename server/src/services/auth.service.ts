import { config } from 'dotenv'
import {
  ChangePasswordPayload,
  LoginPayload,
  LogoutPayload,
  RegisterPayload,
  TokenType,
  UserVerifyStatus
} from '@/types/user'
import { ObjectId } from 'mongodb'
import { signToken } from '@/utils/jwt'
import databaseService from '@/services/database.service'
import UserSchema from '@/models/User.schema'
import { sha256 } from '@/utils/crypto'
import { SignOptions } from 'jsonwebtoken'
import { RefreshTokenType } from '@/types/refreshToken'
import RefreshTokenSchema from '@/models/RefreshToken.schema'
import { ErrorWithStatus } from '@/models/Error.schema'
import { HTTP_STATUS } from '@/types/httpStatus'
import { MESSAGES } from '@/types/messages'
import { user_permission } from '@/utils/permission'

config()

class AuthService {
  async checkRefreshTokenExist(refresh_token: string) {
    return await databaseService.refreshTokens.findOne({
      token: refresh_token
    })
  }
  async checkEmailExist(email: string) {
    return await databaseService.users.findOne({ email })
  }
  async checkVerifyEmailTokenExist(email_verify_token: string) {
    return await databaseService.users.findOne({ email_verify_token })
  }
  async checkForgotPasswordTokenExist(forgot_password_token: string) {
    return await databaseService.users.findOne({ forgot_password_token })
  }
  private async createRefreshToken({ token, user_id }: RefreshTokenType) {
    await databaseService.refreshTokens.insertOne(
      new RefreshTokenSchema({
        token,
        user_id
      })
    )
  }
  private async deleteRefreshToken(refresh_token: string) {
    await databaseService.refreshTokens.deleteOne({
      token: refresh_token
    })
  }
  async changePassword({ email, password }: ChangePasswordPayload) {
    await databaseService.users.updateOne(
      {
        email: email
      },
      {
        $set: {
          password: sha256(password)
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
  }
  async login(payload: LoginPayload) {
    const user = await databaseService.users.findOne({
      email: payload.email,
      password: sha256(payload.password)
    })
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.INVALID_EMAIL_OR_PASSWORD
      })
    }
    const user_id = user._id.toString()
    const [access_token, refresh_token] = await this.signAccessTokenAndRefreshToken(user_id)
    await this.createRefreshToken({ token: refresh_token, user_id: user_id })
    return { access_token, refresh_token }
  }
  async logout({ refresh_token }: LogoutPayload) {
    await this.deleteRefreshToken(refresh_token)
  }
  async register(payload: RegisterPayload) {
    const _id = new ObjectId()
    const verifyEmailToken = await this.signEmailVerifyToken(_id.toString())
    const user = await databaseService.users.insertOne(
      new UserSchema({
        ...payload,
        _id,
        permissions: payload.permissions || user_permission,
        projects: payload.projects || [],
        password: sha256(payload.password),
        email_verify_token: verifyEmailToken
      })
    )
    console.log('email_verify_token: ', verifyEmailToken)
    const user_id = user.insertedId.toString()
    const [access_token, refresh_token] = await this.signAccessTokenAndRefreshToken(user_id)
    await this.createRefreshToken({ token: refresh_token, user_id: user_id })
    return { access_token, refresh_token }
  }
  async refreshToken({ user_id, exp, refresh_token }: { user_id: string; exp?: number; refresh_token: string }) {
    await this.deleteRefreshToken(refresh_token)
    const [new_access_token, new_refresh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken({
        user_id,
        exp
      })
    ])
    await this.createRefreshToken({
      token: new_refresh_token,
      user_id: user_id
    })
    return { new_access_token, new_refresh_token }
  }
  private signEmailVerifyToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.EmailVerifyToken
      },
      privateKey: process.env.JWT_VERIFY_EMAIL_TOKEN_SECRET_KEY as string,
      options: {
        algorithm: 'HS256',
        expiresIn: '1d'
      }
    })
  }
  private async signAccessToken(user_id: string) {
    const _id = new ObjectId(user_id)
    const user = await databaseService.users.findOne({ _id })
    if (!user) {
      throw new ErrorWithStatus({
        message: 'USER_ID NOT FOUND',
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    return signToken({
      payload: {
        user_id,
        permissions: user.permissions,
        projects: user.projects,
        token_type: TokenType.AccessToken
      },
      privateKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY as string,
      options: {
        algorithm: 'HS256',
        expiresIn: '15m'
      }
    })
  }
  private signRefreshToken({ user_id, exp = undefined }: { user_id: string; exp?: number }) {
    const payload = exp
      ? {
          user_id,
          exp,
          token_type: TokenType.RefreshToken
        }
      : {
          user_id,
          token_type: TokenType.RefreshToken
        }
    const options = exp
      ? undefined
      : ({
          algorithm: 'HS256',
          expiresIn: '100d'
        } as SignOptions)
    return signToken({
      payload,
      privateKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY as string,
      options
    })
  }

  private async signAccessTokenAndRefreshToken(user_id: string) {
    return await Promise.all([this.signAccessToken(user_id), this.signRefreshToken({ user_id })])
  }
  async verifyEmail(user_id: string) {
    await databaseService.users.updateOne(
      { _id: new ObjectId(user_id) },
      {
        $set: {
          email_verify_token: '',
          verify: UserVerifyStatus.Verified
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
    const [access_token, refresh_token] = await this.signAccessTokenAndRefreshToken(user_id)
    return { access_token, refresh_token }
  }
  async resendVerifyEmail(user_id: string) {
    const verifyEmailToken = await this.signEmailVerifyToken(user_id)
    await databaseService.users.updateOne(
      { _id: new ObjectId(user_id) },
      {
        $set: {
          email_verify_token: verifyEmailToken
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
    console.log('verifyEmailToken: ', verifyEmailToken)
  }
  private signForgotPasswordToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.ForgotPasswordToken
      },
      privateKey: process.env.JWT_FORGOT_PASSWORD_TOKEN_SECRET_KEY as string,
      options: {
        algorithm: 'HS256',
        expiresIn: '1d'
      }
    })
  }
  async forgotPassword(email: string) {
    const user = (await databaseService.users.findOne({ email })) as UserSchema
    const forgotPasswordToken = await this.signForgotPasswordToken(user._id.toString())
    await databaseService.users.updateOne(
      { _id: new ObjectId(user._id) },
      {
        $set: {
          forgot_password_token: forgotPasswordToken
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
    console.log('forgotPasswordToken: ', forgotPasswordToken)
  }
  async resetPassword(user_id: string, password: string) {
    await databaseService.users.updateOne(
      { _id: new ObjectId(user_id) },
      {
        $set: {
          password: sha256(password),
          forgot_password_token: ''
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
    const [access_token, refresh_token] = await this.signAccessTokenAndRefreshToken(user_id)
    return {
      access_token,
      refresh_token
    }
  }
}

const authService = new AuthService()

export default authService
