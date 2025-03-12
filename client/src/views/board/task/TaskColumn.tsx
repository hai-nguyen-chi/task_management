import type React from 'react'
import { useDroppable } from '@dnd-kit/core'
import type { UniqueIdentifier } from '@dnd-kit/core'

interface ColumnProps {
  id: UniqueIdentifier
  title: string
  children: React.ReactNode
}

export function TaskColumn({ id, title, children }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id
  })

  return (
    <div className='flex flex-col h-full'>
      <div className='flex items-center justify-between p-3 border-b'>
        <h2 className='font-medium'>{title}</h2>
      </div>
      <div ref={setNodeRef} className='flex-1 p-3 space-y-3 bg-gray-50 min-h-[300px]'>
        {children}
      </div>
    </div>
  )
}
