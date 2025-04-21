import { ObjectId } from 'mongodb'
import { TagDTO } from '@/types/tag'

class TagSchema {
  _id: ObjectId
  title: string
  color: string
  background_color: string
  created_at: Date
  updated_at: Date

  constructor(tag: TagDTO) {
    const date = new Date()
    this._id = tag._id
    this.title = tag.title
    this.color = tag.color
    this.background_color = tag.background_color
    this.created_at = tag.created_at || date
    this.updated_at = tag.updated_at || date
  }
}

export default TagSchema
