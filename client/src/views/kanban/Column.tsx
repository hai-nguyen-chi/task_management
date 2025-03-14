'use client'

import { useDroppable } from '@dnd-kit/core'
import { MoreHorizontal } from 'lucide-react'
import type { ReactNode } from 'react'

type ColumnProps = {
  id: string
  title: string
  children: ReactNode
}

export function Column({ id, title, children }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id
  })

  return (
    <div
      ref={setNodeRef}
      className={`flex-shrink-0 w-80 bg-white rounded-lg border shadow-sm flex flex-col h-full ${
        isOver ? 'ring-2 ring-primary ring-opacity-50' : ''
      }`}
    >
      <div className='p-3 flex items-center justify-between border-b shrink-0'>
        <h3 className='font-medium'>{title}</h3>
        <button className='p-1 rounded-md hover:bg-muted'>
          <MoreHorizontal className='h-5 w-5 text-muted-foreground' />
        </button>
      </div>
      <div className='p-2 space-y-2 flex-1 overflow-y-auto'>{children}</div>
    </div>
  )
}
