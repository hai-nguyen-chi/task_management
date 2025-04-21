import { ObjectId } from 'mongodb'
import { SprintDTO, SprintStatus } from '@/types/sprint'

class SprintSchema {
  _id: ObjectId
  title: string
  status: SprintStatus
  created_at: Date
  updated_at: Date

  constructor(sprint: SprintDTO) {
    const date = new Date()
    this._id = sprint._id
    this.title = sprint.title
    this.status = sprint.status || SprintStatus.ToDo
    this.created_at = sprint.created_at || date
    this.updated_at = sprint.updated_at || date
  }
}

export default SprintSchema
