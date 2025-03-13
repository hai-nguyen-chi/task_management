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

export type { TaskColumnProps, TaskItemWrapperProps, TaskItemDragableProps, TaskItemProps }
