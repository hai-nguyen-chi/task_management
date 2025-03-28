import { ObjectId } from 'mongodb'

const TaskStatusMap: Record<TaskStatus, TaskStatusType> = {
  [TaskStatus.Backlog]: 'Backlog',
  [TaskStatus.ToDo]: 'ToDo',
  [TaskStatus.InProgress]: 'InProgress',
  [TaskStatus.InReview]: 'InReview',
  [TaskStatus.Completed]: 'Completed'
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
  task_code: string
  title: string
  description: string
  status: TaskStatusType
  tags: ObjectId[]
  created_at: Date
  updated_at: Date
}

export { TaskStatusMap, TaskStatusType, TaskStatus, TaskDTO }
