import { type UniqueIdentifier } from '@dnd-kit/core'

type TaskType = {
  id: UniqueIdentifier
  content: string
}

type ContainerTaskType = {
  id: UniqueIdentifier
  title: string
  items: TaskType[]
}

export type { TaskType, ContainerTaskType }
