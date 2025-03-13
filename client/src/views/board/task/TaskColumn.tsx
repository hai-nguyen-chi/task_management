import { useDroppable } from '@dnd-kit/core'
import { type TaskColumnProps } from '@/interfaces/task.interface'

export default function TaskColumn({ id, title, items, children }: TaskColumnProps) {
  const { setNodeRef } = useDroppable({
    id
  })

  return (
    <div className='flex flex-col min-w-[270px] w-[25%] mx-2 bg-[#F7F8F9] rounded-md'>
      <div className='flex items-center justify-between p-4'>
        <h2 className='text-xs font-medium text-[#626f86]'>
          {title} {Boolean(items.length) && <span>{items.length}</span>}
        </h2>
      </div>
      <div ref={setNodeRef} className='flex-1 px-1 space-y-3 min-h-[300px]'>
        {children}
      </div>
    </div>
  )
}
