import { ObjectId } from 'mongodb'
import { TaskStatus } from '@/constants/task.constants'

class TaskSchema {
  _id: ObjectId
  title: string
  description: string
  status: TaskStatus
  tags: ObjectId[]
  created_at: Date
  updated_at: Date

  constructor(task: TaskSchema) {
    this._id = task._id || new ObjectId()
    this.title = task.title
    this.description = task.description
    this.status = task.status
    this.tags = task.tags || new Date()
    this.created_at = task.created_at || new Date()
    this.updated_at = task.updated_at || new Date()
  }
}

export default TaskSchema
