import { type UniqueIdentifier } from '@dnd-kit/core'
import { type TaskType } from '@/types/task.type'

interface TaskColumnProps {
  id: UniqueIdentifier
  title: string
  items: TaskType[]
  children: React.ReactNode
}

interface TaskItemDragableProps {
  id: UniqueIdentifier
  children: React.ReactNode
}

interface TaskItemWrapperProps {
  children: React.ReactNode
  isDragging: boolean
}

interface TaskItemProps {
  title: string
}

type TaskType = {
  id: UniqueIdentifier
  content: string
}

type ContainerTaskType = {
  id: UniqueIdentifier
  title: string
  items: TaskType[]
}

export type { TaskColumnProps, TaskItemWrapperProps, TaskItemDragableProps, TaskItemProps, TaskType, ContainerTaskType }
