import { ObjectId } from 'mongodb'
import { TaskStatus } from '@/types/task'

interface ProjectMemberRole {
  member_id: ObjectId
  isAdmin: boolean
}

interface ProjectDTO {
  _id: ObjectId
  avatar: string
  name: string
  key: string
  project_url: string
  task_status: TaskStatus[]
  members: ProjectMemberRole[]
  created_at?: Date
  updated_at?: Date
}

export { ProjectMemberRole, ProjectDTO }
