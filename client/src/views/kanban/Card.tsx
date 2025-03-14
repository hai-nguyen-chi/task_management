'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type CardProps = {
  id: string
  content: string
  color: string
  isDragging?: boolean
  onClick?: () => void
}

export function Card({ id, content, color, isDragging, onClick }: CardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className='bg-white border rounded-md p-3 cursor-pointer hover:shadow-md transition-shadow'
    >
      <div className='flex items-start'>
        <div className={`w-1 h-full min-h-[24px] rounded-full mr-2 ${color}`} />
        <div className='flex-1'>{content}</div>
      </div>
    </div>
  )
}
