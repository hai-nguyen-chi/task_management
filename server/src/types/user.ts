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
  permissions: string[]
  projects: UserProjectRole[]
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

interface UserProjectRole {
  project_id: ObjectId
  isAdmin: boolean
}

interface UserDTO {
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
  permissions: string[]
  projects: UserProjectRole[]
}

export {
  UserVerifyStatus,
  TokenType,
  LoginPayload,
  RegisterPayload,
  LogoutPayload,
  ChangePasswordPayload,
  UserProjectRole,
  UserDTO
}
