import { ObjectId } from 'mongodb'
import { TaskStatus } from '@/types/task'

interface ProjectDTO {
  _id: ObjectId
  avatar: string
  name: string
  key: string
  project_url: string
  task_status: TaskStatus[]
  created_at?: Date
  updated_at?: Date
}

export { ProjectDTO }
