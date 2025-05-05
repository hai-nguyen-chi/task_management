import { ObjectId } from 'mongodb'
import { UserProjectRole } from '@/types/user'

enum TokenType {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerifyToken
}

interface RefreshTokenType {
  _id?: ObjectId
  token: string
  created_at?: Date
  user_id: string
}

interface AccessTokenPayload {
  user_id: string
  token_type: TokenType
  permissions: string[]
  projects: UserProjectRole[]
  iat: number
  exp: number
}

interface TokenPayload {
  user_id: string
  token_type: TokenType
  iat: number
  exp: number
}

export { RefreshTokenType, AccessTokenPayload, TokenPayload }
