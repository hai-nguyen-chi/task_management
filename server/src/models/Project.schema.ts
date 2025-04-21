import { ObjectId } from 'mongodb'
import { TaskStatus } from '@/types/task'
import { ProjectDTO } from '@/types/project'

class ProjectSchema {
  _id: ObjectId
  avatar: string
  name: string
  key: string
  project_url: string
  task_status: TaskStatus[]
  created_at: Date
  updated_at: Date

  constructor(project: ProjectDTO) {
    const date = new Date()
    this._id = project._id
    this.avatar = project.avatar
    this.name = project.name
    this.key = project.key
    this.project_url = project.project_url
    this.task_status = project.task_status || []
    this.created_at = project.created_at || date
    this.updated_at = project.updated_at || date
  }
}

export default ProjectSchema
