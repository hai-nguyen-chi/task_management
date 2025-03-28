import type React from 'react'
import { type TaskItemWrapperProps } from '@/types/task.d'

const handleClick = (e: React.MouseEvent) => {
  console.log('click')
  e.stopPropagation()
}

export default function TaskItemWrapper({ children, isDragging }: TaskItemWrapperProps) {
  return (
    <div
      className='p-3 bg-white border rounded-md shadow-sm'
      onClick={handleClick}
      style={{
        cursor: isDragging ? 'grabbing' : 'pointer'
      }}
    >
      {children}
    </div>
  )
}
