import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { type TaskItemDragableProps } from '@/interfaces/task.interface'
import TaskItemWrapper from '@/views/board/task/TaskItemWrapper'

export default function TaskItemDragable({ id, children }: TaskItemDragableProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 1
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskItemWrapper isDragging={isDragging}>{children}</TaskItemWrapper>
    </div>
  )
}
