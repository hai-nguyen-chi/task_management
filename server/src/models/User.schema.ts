import { ObjectId } from 'mongodb'
import { UserProjectRole, UserDTO, UserVerifyStatus } from '@/types/user'

class UserSchema {
  _id: ObjectId
  name: string
  email: string
  date_of_birth: Date
  password: string
  created_at: Date
  updated_at: Date
  email_verify_token: string
  forgot_password_token: string
  verify: UserVerifyStatus
  username: string
  avatar: string
  cover_photo: string
  permissions: string[]
  projects: UserProjectRole[]

  constructor(user: UserDTO) {
    const date = new Date()
    this._id = user._id || new ObjectId()
    this.name = user.name
    this.email = user.email
    this.date_of_birth = new Date(user.date_of_birth)
    this.password = user.password
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
    this.email_verify_token = user.email_verify_token || ''
    this.forgot_password_token = user.forgot_password_token || ''
    this.verify = user.verify || UserVerifyStatus.Unverified
    this.username = user.username || ''
    this.avatar = user.avatar || ''
    this.cover_photo = user.cover_photo || ''
    this.permissions = user.permissions || []
    this.projects = user.projects || []
  }
}

export default UserSchema
