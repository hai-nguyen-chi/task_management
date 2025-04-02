import { ObjectId } from 'mongodb'

enum UserVerifyStatus {
  Unverified,
  Verified,
  Banned
}

interface Comment {
  user_id: ObjectId
  text: string
  mentions: ObjectId[]
}

export { UserVerifyStatus, Comment }
