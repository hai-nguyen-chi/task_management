import { ObjectId } from 'mongodb'

class SequenceSchema {
  _id: ObjectId
  sequence_value: number

  constructor(task: SequenceSchema) {
    this._id = task._id
    this.sequence_value = task.sequence_value
  }
}

export default SequenceSchema
