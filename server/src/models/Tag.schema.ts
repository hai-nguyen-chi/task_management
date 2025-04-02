import { ObjectId } from 'mongodb'

class TagSchema {
  _id: ObjectId
  title: string
  color: string
  background_color: string
  created_at: Date
  updated_at: Date

  constructor(tag: TagSchema) {
    this._id = tag._id
    this.title = tag.title
    this.color = tag.color
    this.background_color = tag.background_color
    this.created_at = tag.created_at || new Date()
    this.updated_at = tag.updated_at || new Date()
  }
}

export default TagSchema
