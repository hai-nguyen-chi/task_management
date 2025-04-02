import { ObjectId } from 'mongodb'

class RefreshTokenSchema {
  _id: ObjectId
  token: string
  created_at: Date
  user_id: ObjectId

  constructor(refreshToken: RefreshTokenSchema) {
    this._id = refreshToken._id
    this.token = refreshToken.token
    this.created_at = refreshToken.created_at
    this.user_id = refreshToken.user_id
  }
}

export default RefreshTokenSchema
