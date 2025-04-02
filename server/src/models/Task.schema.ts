import { ObjectId } from 'mongodb'
import { PriorityStatus, Media } from '@/types/task'
import { Comment } from '@/types/user'

class TaskSchema {
  _id: ObjectId
  task_code: string
  title: string
  description: string
  status_id: ObjectId
  tag_id: ObjectId
  priority: PriorityStatus
  sprint_id: ObjectId
  story_point_est: number | null
  fix_version: string
  due_date: Date | null
  attachments: Media[]
  comments: Comment[]
  user_created_id: ObjectId
  user_assignee_id: ObjectId
  created_at: Date
  updated_at: Date

  constructor(task: TaskSchema) {
    this._id = task._id || new ObjectId()
    this.task_code = task.task_code
    this.title = task.title
    this.description = task.description
    this.status_id = task.status_id
    this.tag_id = task.tag_id
    this.priority = task.priority || PriorityStatus.Medium
    this.sprint_id = task.sprint_id
    this.story_point_est = task.story_point_est
    this.fix_version = task.fix_version || ''
    this.due_date = task.due_date
    this.attachments = task.attachments || []
    this.comments = task.comments || []
    this.user_created_id = task.user_created_id
    this.user_assignee_id = task.user_assignee_id
    this.created_at = task.created_at || new Date()
    this.updated_at = task.updated_at || new Date()
  }
}

export default TaskSchema
