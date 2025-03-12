import type React from 'react'

interface ItemProps {
  children: React.ReactNode
}

export function TaskItem({ children }: ItemProps) {
  return <div className='p-4 bg-white border rounded-md shadow-sm cursor-grab'>{children}</div>
}
