type Task = {
  id: string
  title: string
  description?: string
  status: 'backlog' | 'in-progress' | 'in-review' | 'completed'
  tags?: string[]
  image?: string
}

export type { Task }
