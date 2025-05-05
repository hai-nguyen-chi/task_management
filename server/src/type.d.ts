import { TokenPayload, AccessTokenPayload } from '@/types/refreshToken'

declare module 'express' {
  interface Request {
    decoded_authorization?: AccessTokenPayload
    decoded_refresh_token?: TokenPayload
    decoded_email_verify_token?: TokenPayload
    decoded_forgot_password_token?: TokenPayload
  }
}
