import { ObjectId } from 'mongodb'

enum SprintStatus {
  ToDo,
  InProgress,
  Done
}

interface SprintDTO {
  _id: ObjectId
  title: string
  status: SprintStatus
  created_at?: Date
  updated_at?: Date
}

export { SprintStatus, SprintDTO }
