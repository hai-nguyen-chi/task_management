import { ObjectId } from 'mongodb'

enum TaskStatus {
  Backlog,
  InProgress,
  InReview,
  Completed
}

interface TaskObject {
  _id: ObjectId
  title: string
  description: string
  status: TaskStatus
  tags: ObjectId[]
  created_at: Date
  updated_at: Date
}

export { TaskStatus, TaskObject }
