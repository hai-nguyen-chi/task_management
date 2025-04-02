import { ObjectId } from 'mongodb'

class TaskStatusSchema {
  _id: ObjectId
  title: string
  isDefaultCreateTask: boolean
  created_at: Date
  updated_at: Date

  constructor(taskStatus: TaskStatusSchema) {
    this._id = taskStatus._id
    this.title = taskStatus.title
    this.isDefaultCreateTask = taskStatus.isDefaultCreateTask
    this.created_at = taskStatus.created_at || new Date()
    this.updated_at = taskStatus.updated_at || new Date()
  }
}

export default TaskStatusSchema
