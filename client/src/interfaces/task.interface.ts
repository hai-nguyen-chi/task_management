import type { ReactNode } from 'react'
import type { Task } from '@/types/task.type'

interface TaskCardProps {
  task: Task
  onClick: () => void
}

interface TaskColumnProps {
  id: string
  title: string
  count: number
  status: Task['status']
  children: ReactNode
}

export type { TaskCardProps, TaskColumnProps }
