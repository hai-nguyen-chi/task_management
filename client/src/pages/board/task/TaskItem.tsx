import { type TaskItemProps } from '@/types/task.d'

export default function TaskItem({ title }: TaskItemProps) {
  return (
    <div className='text-sm text-primary'>
      <div className=' mr-8'>{title}</div>
      {<div className='bg-[#091e420f] inline-block px-2 my-2 rounded-xs'>Enhancement</div>}
      <div className='mt-1'>
        <div className='text-secondary text-xs font-semibold'>TK-1</div>
      </div>
    </div>
  )
}
