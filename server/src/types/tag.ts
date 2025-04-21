import { ObjectId } from 'mongodb'

interface TagDTO {
  _id: ObjectId
  title: string
  color: string
  background_color: string
  created_at?: Date
  updated_at?: Date
}

export { TagDTO }
