import { ObjectId } from 'mongodb'

class SprintSchema {
  _id: ObjectId
  title: string
  created_at: Date
  updated_at: Date

  constructor(print: SprintSchema) {
    this._id = print._id
    this.title = print.title
    this.created_at = print.created_at || new Date()
    this.updated_at = print.updated_at || new Date()
  }
}

export default SprintSchema
