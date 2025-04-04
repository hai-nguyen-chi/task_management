import { config } from 'dotenv'
import { validate } from '@/utils/validateHandler'
import { checkSchema, ParamSchema } from 'express-validator'
import { ErrorWithStatus } from '@/models/Error.schema'
import { HTTP_STATUS } from '@/types/httpStatus'
import authService from '@/services/auth.service'
import { MESSAGES } from '@/types/messages'
import { verifyToken } from '@/utils/jwt'
import { sha256 } from '@/utils/crypto'
import { UserVerifyStatus } from '@/types/user'

config()

const emailSchema: ParamSchema = {
  isEmail: true,
  custom: {
    options: async (value: string) => {
      if (!value) {
        throw new ErrorWithStatus({
          message: MESSAGES.PLEASE_ENTER_EMAIL,
          status: HTTP_STATUS.BAD_REQUEST
        })
      }
      const user = await authService.checkEmailExist(value)
      if (!user) {
        throw new ErrorWithStatus({
          message: MESSAGES.EMAIL_NOT_FOUND,
          status: HTTP_STATUS.NOT_FOUND
        })
      }
    }
  }
}

const passwordSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MESSAGES.PLEASE_ENTER_PASSWORD
  },
  isString: true
}

const confirmPasswordSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MESSAGES.PLEASE_ENTER_CONFIRM_PASSWORD
  },
  isString: true,
  custom: {
    options: (value, { req }) => value === req.body.password,
    errorMessage: MESSAGES.PASSWORD_DO_NOT_MATCH
  }
}
const forgotPasswordToken: ParamSchema = {
  custom: {
    options: async (value: string, { req }) => {
      if (!value) {
        throw new ErrorWithStatus({
          message: MESSAGES.INVALID_FORGOT_PASSWORD_TOKEN,
          status: HTTP_STATUS.UNAUTHORIZED
        })
      }
      const [decoded_forgot_password_token, user] = await Promise.all([
        await verifyToken({
          token: value,
          secretOrPublicKey: process.env.JWT_FORGOT_PASSWORD_TOKEN_SECRET_KEY as string
        }),
        await authService.checkForgotPasswordTokenExist(value)
      ])
      if (!user) {
        throw new ErrorWithStatus({
          message: MESSAGES.INVALID_FORGOT_PASSWORD_TOKEN,
          status: HTTP_STATUS.UNAUTHORIZED
        })
      }
      req.decoded_forgot_password_token = decoded_forgot_password_token
    }
  }
}

const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        custom: {
          options: async (value: string, { req }) => {
            const token = value.split(' ')[1]
            if (!token) {
              throw new ErrorWithStatus({
                message: MESSAGES.INVALID_ACCESS_TOKEN,
                status: HTTP_STATUS.UNAUTHORIZED
              })
            }
            req.decoded_authorization = await verifyToken({
              token,
              secretOrPublicKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY as string
            })
          }
        }
      }
    },
    ['headers']
  )
)
const changePasswordValidator = validate(
  checkSchema({
    email: emailSchema,
    old_password: {
      custom: {
        options: async (value: string, { req }) => {
          if (!value) {
            throw new ErrorWithStatus({
              message: MESSAGES.PLEASE_ENTER_PASSWORD,
              status: HTTP_STATUS.BAD_REQUEST
            })
          }
          const user = await authService.checkEmailExist(req.body.email)
          if (!user) {
            throw new ErrorWithStatus({
              message: MESSAGES.EMAIL_NOT_FOUND,
              status: HTTP_STATUS.NOT_FOUND
            })
          }
          if (user.password !== sha256(value)) {
            throw new ErrorWithStatus({
              message: MESSAGES.INVALID_EMAIL_OR_PASSWORD,
              status: HTTP_STATUS.BAD_REQUEST
            })
          }
        }
      }
    },
    password: passwordSchema,
    confirm_password: {
      ...confirmPasswordSchema,
      custom: {
        options: (value, { req }) => value === req.body.password,
        errorMessage: MESSAGES.PASSWORD_DO_NOT_MATCH
      }
    }
  })
)
const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: {
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new ErrorWithStatus({
                message: MESSAGES.INVALID_REFRESH_TOKEN,
                status: HTTP_STATUS.UNAUTHORIZED
              })
            }
            const [decoded_refresh_token, refresh_token] = await Promise.all([
              await verifyToken({
                token: value,
                secretOrPublicKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY as string
              }),
              await authService.checkRefreshTokenExist(value)
            ])
            if (!refresh_token) {
              throw new ErrorWithStatus({
                message: MESSAGES.INVALID_REFRESH_TOKEN,
                status: HTTP_STATUS.UNAUTHORIZED
              })
            }
            req.decoded_refresh_token = decoded_refresh_token
          }
        }
      }
    },
    ['body']
  )
)

const registerValidator = validate(
  checkSchema(
    {
      name: {
        trim: true,
        isString: true,
        isLength: {
          options: {
            min: 1,
            max: 255
          }
        },
        notEmpty: {
          errorMessage: MESSAGES.PLEASE_ENTER_NAME
        }
      },
      email: {
        isEmail: true,
        custom: {
          options: async (value: string) => {
            if (!value) {
              throw new ErrorWithStatus({
                message: MESSAGES.PLEASE_ENTER_EMAIL,
                status: HTTP_STATUS.BAD_REQUEST
              })
            }
            const user = await authService.checkEmailExist(value)
            if (user) {
              throw new ErrorWithStatus({
                message: MESSAGES.EMAIL_ALREADY_EXIST,
                status: HTTP_STATUS.BAD_REQUEST
              })
            }
          }
        }
      },
      password: passwordSchema,
      confirm_password: confirmPasswordSchema,
      date_of_birth: {
        isString: true,
        notEmpty: {
          errorMessage: MESSAGES.PLEASE_ENTER_DATE_OF_BIRTH
        }
      }
    },
    ['body']
  )
)

const loginValidator = validate(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: MESSAGES.PLEASE_ENTER_EMAIL
        },
        isEmail: true
      },
      password: passwordSchema
    },
    ['body']
  )
)

const verifyEmailTokenValidator = validate(
  checkSchema({
    email_verify_token: {
      custom: {
        options: async (value: string, { req }) => {
          if (!value) {
            throw new ErrorWithStatus({
              message: MESSAGES.INVALID_EMAIL_VERIFY_TOKEN,
              status: HTTP_STATUS.UNAUTHORIZED
            })
          }
          const [decoded_email_verify_token, user] = await Promise.all([
            await verifyToken({
              token: value,
              secretOrPublicKey: process.env.JWT_VERIFY_EMAIL_TOKEN_SECRET_KEY as string
            }),
            await authService.checkVerifyEmailTokenExist(value)
          ])
          if (!user) {
            throw new ErrorWithStatus({
              message: MESSAGES.INVALID_EMAIL_VERIFY_TOKEN,
              status: HTTP_STATUS.UNAUTHORIZED
            })
          }
          if (user.verify === UserVerifyStatus.Verified) {
            throw new ErrorWithStatus({
              message: MESSAGES.EMAIL_ALREADY_VERIFIED,
              status: HTTP_STATUS.UNAUTHORIZED
            })
          }
          req.decoded_email_verify_token = decoded_email_verify_token
        }
      }
    }
  })
)
const forgotPasswordValidator = validate(
  checkSchema({
    email: emailSchema
  })
)
const verifyForgotPasswordValidator = validate(
  checkSchema({
    forgot_password_token: forgotPasswordToken
  })
)
const resetPasswordValidator = validate(
  checkSchema({
    password: passwordSchema,
    confirm_password: {
      ...confirmPasswordSchema,
      custom: {
        options: (value, { req }) => value === req.body.password,
        errorMessage: MESSAGES.PASSWORD_DO_NOT_MATCH
      }
    },
    forgot_password_token: forgotPasswordToken
  })
)

export {
  accessTokenValidator,
  changePasswordValidator,
  refreshTokenValidator,
  registerValidator,
  loginValidator,
  verifyEmailTokenValidator,
  forgotPasswordValidator,
  verifyForgotPasswordValidator,
  resetPasswordValidator
}
