class SequenceSchema {
  _id: string
  sequence_value: number

  constructor(task: SequenceSchema) {
    this._id = task._id
    this.sequence_value = task.sequence_value
  }
}

export default SequenceSchema
