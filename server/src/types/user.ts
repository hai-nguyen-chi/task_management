import { ObjectId } from 'mongodb'

enum UserVerifyStatus {
  Unverified,
  Verified,
  Banned
}
enum TokenType {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerifyToken
}

interface Comment {
  user_id: ObjectId
  text: string
  mentions: ObjectId[]
}

interface LoginPayload {
  email: string
  password: string
}

interface RegisterPayload {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}

interface LogoutPayload {
  refresh_token: string
}
interface ChangePasswordPayload {
  email: string
  old_password?: string
  password: string
  confirm_password?: string
}

interface UserObject {
  _id: ObjectId
  name: string
  email: string
  date_of_birth: string
  password: string
  created_at?: Date
  updated_at?: Date
  email_verify_token?: string
  forgot_password_token?: string
  verify?: UserVerifyStatus
  username?: string
  avatar?: string
  cover_photo?: string
}

export {
  UserVerifyStatus,
  TokenType,
  Comment,
  LoginPayload,
  RegisterPayload,
  LogoutPayload,
  ChangePasswordPayload,
  UserObject
}
