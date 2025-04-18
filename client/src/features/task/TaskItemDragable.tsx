import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { type TaskItemDragableProps } from '@/types/task'
import TaskItemWrapper from '@/features/task/TaskItemWrapper.tsx'

export default function TaskItemDragable({ id, children }: TaskItemDragableProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskItemWrapper isDragging={isDragging}>{children}</TaskItemWrapper>
    </div>
  )
}
