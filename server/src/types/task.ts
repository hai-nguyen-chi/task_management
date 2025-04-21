import { ObjectId } from 'mongodb'

interface TaskStatus {
  title: string
  isDefault: boolean
}

enum PriorityStatus {
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

interface Comment {
  user_id: ObjectId
  text: string
  mentions: ObjectId[]
}

export { TaskStatus, PriorityStatus, Media, Comment }
