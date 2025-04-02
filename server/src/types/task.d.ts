import { ObjectId } from 'mongodb'

const PriorityStatusMap: Record<PriorityStatus, PriorityStatusType> = {
  [PriorityStatus.Lowest]: 'Lowest',
  [PriorityStatus.Low]: 'Low',
  [PriorityStatus.Medium]: 'Medium',
  [PriorityStatus.High]: 'High',
  [PriorityStatus.Highest]: 'Highest'
} as const

type PriorityStatusType = 'Lowest' | 'Low' | 'Medium' | 'High' | 'Highest'

enum PriorityStatus {
  Lowest,
  Low,
  Medium,
  High,
  Highest
}

enum MediaType {
  Image,
  Video
}

interface Media {
  url: string
  type: MediaType // video, image
}

interface TaskDTO {
  _id: ObjectId
  task_code: string
  title: string
  description: string
  status: ObjectId
  tag: ObjectId
  priority: PriorityStatusType
  sprint: ObjectId
  story_point_est: number
  fix_version: string
  due_date: Date
  attachments: Media[]
  comments: Comment[]
  user_created_id: ObjectId
  user_assignee_id: ObjectId
  created_at: Date
  updated_at: Date
}

export { PriorityStatusMap, PriorityStatusType, PriorityStatus, Media, TaskDTO }
