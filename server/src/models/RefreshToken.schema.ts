import { ObjectId } from 'mongodb'
import { RefreshTokenType } from '@/types/refreshToken'

class RefreshTokenSchema {
  _id: ObjectId
  token: string
  created_at: Date
  user_id: string

  constructor(refreshToken: RefreshTokenType) {
    this._id = refreshToken._id || new ObjectId()
    this.token = refreshToken.token
    this.created_at = refreshToken.created_at || new Date()
    this.user_id = refreshToken.user_id
  }
}

export default RefreshTokenSchema
