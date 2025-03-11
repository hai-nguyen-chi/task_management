import { ObjectId } from 'mongodb'

const TaskStatusMap = {
  0: 'Backlog',
  1: 'ToDo',
  2: 'InProgress',
  3: 'InReview',
  4: 'Completed'
} as const

type TaskStatusType = 'Backlog' | 'ToDo' | 'InProgress' | 'InReview' | 'Completed'

enum TaskStatus {
  Backlog,
  ToDo,
  InProgress,
  InReview,
  Completed
}

interface TaskDTO {
  _id: ObjectId
  title: string
  description: string
  status: TaskStatusType
  tags: ObjectId[]
  created_at: Date
  updated_at: Date
}

export { TaskStatusMap, TaskStatusType, TaskStatus, TaskDTO }
