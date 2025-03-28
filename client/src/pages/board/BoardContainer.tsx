import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
  type UniqueIdentifier
} from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { type ContainerTaskType } from '@/types/task'
import BoardColumn from '@/pages/board/BoardColumn'
import TaskItemDragable from '@/pages/board/task/TaskItemDragable'
import TaskItemWrapper from '@/pages/board/task/TaskItemWrapper'
import TaskItem from '@/pages/board/task/TaskItem'

export default function BoardContainer() {
  const [containers, setContainers] = useState<ContainerTaskType[]>([
    {
      id: 'Backlog',
      title: 'Backlog',
      items: [
        { id: 'A1', content: 'Implement CRUD (Create, Read, Update, and Delete) operations' },
        { id: 'A3', content: 'Implement the ability for users to edit tasks.' },
        { id: 'B2', content: 'Implement the ability for users to view a specific subset of tasks.' }
      ]
    },
    {
      id: 'ToDo',
      title: 'ToDo',
      items: []
    },
    {
      id: 'InProgress',
      title: 'InProgress',
      items: [
        { id: 'C1', content: 'Use the useEffect state Hook to update the number of pending tasks.' },
        { id: 'C2', content: 'Implement the ability for users to delete tasks using the mouse or keyboard.' },
        { id: 'B1', content: 'Investigate Framer-Motion for animations.' }
      ]
    },
    {
      id: 'InReview',
      title: 'InReview',
      items: [
        { id: 'D1', content: 'Create a basic App component structure and styling.' },
        { id: 'D2', content: 'Design Todo App' },
        { id: 'D3', content: 'Implement the ability for users to add tasks using the mouse or keyboard.' }
      ]
    },
    {
      id: 'Completed',
      title: 'Completed',
      items: []
    }
  ])

  // Keep track of active item and container
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [activeContainer, setActiveContainer] = useState<UniqueIdentifier | null>(null)

  // Configure sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8 // Only activate after moving 8px - this helps distinguish between click and drag
      }
    })
  )

  // Find the container that contains an item
  const findContainer = (id: UniqueIdentifier) => {
    // Check if the id is a container id
    const container = containers.find((container) => container.id === id)
    if (container) return id

    // Check if the id is an item id
    return containers.find((container) => container.items.some((item) => item.id === id))?.id
  }

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const id = active.id
    const containerId = findContainer(id)

    if (containerId) {
      setActiveId(id)
      setActiveContainer(containerId)
    }
  }

  // Handle drag over
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over) return

    const activeId = active.id
    const overId = over.id

    // Find the containers
    const activeContainerId = findContainer(activeId)
    const overContainerId = findContainer(overId)

    if (!activeContainerId || !overContainerId || activeContainerId === overContainerId) {
      return
    }

    setContainers((prev) => {
      const activeContainer = prev.find((container) => container.id === activeContainerId)
      const overContainer = prev.find((container) => container.id === overContainerId)

      if (!activeContainer || !overContainer) return prev

      // Find the index of the active item
      const activeItemIndex = activeContainer.items.findIndex((item) => item.id === activeId)

      // Create a new array with the active item removed
      const newActiveContainerItems = [...activeContainer.items]
      const [removedItem] = newActiveContainerItems.splice(activeItemIndex, 1)

      // Add the active item to the new container
      const newOverContainerItems = [...overContainer.items, removedItem]

      return prev.map((container) => {
        if (container.id === activeContainerId) {
          return {
            ...container,
            items: newActiveContainerItems
          }
        }

        if (container.id === overContainerId) {
          return {
            ...container,
            items: newOverContainerItems
          }
        }

        return container
      })
    })

    setActiveContainer(overContainerId)
  }

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveId(null)
      setActiveContainer(null)
      return
    }

    const activeId = active.id
    const overId = over.id

    // Find the containers
    const activeContainerId = findContainer(activeId)
    const overContainerId = findContainer(overId)

    if (!activeContainerId || !overContainerId) {
      setActiveId(null)
      setActiveContainer(null)
      return
    }

    // If the item was dropped in a different container, we handled it in handleDragOver
    if (activeContainerId !== overContainerId) {
      setActiveId(null)
      setActiveContainer(null)
      return
    }

    // Find the container
    const containerIndex = containers.findIndex((container) => container.id === activeContainerId)
    const container = containers[containerIndex]

    // Find the indices of the active and over items
    const activeIndex = container.items.findIndex((item) => item.id === activeId)
    const overIndex = container.items.findIndex((item) => item.id === overId)

    // If the indices are the same, no need to do anything
    if (activeIndex === overIndex) {
      setActiveId(null)
      setActiveContainer(null)
      return
    }

    // Reorder the items in the container
    setContainers((prev) => {
      const newContainers = [...prev]
      const newContainer = { ...newContainers[containerIndex] }
      newContainer.items = arrayMove(newContainer.items, activeIndex, overIndex)
      newContainers[containerIndex] = newContainer
      return newContainers
    })

    setActiveId(null)
    setActiveContainer(null)
  }

  // Find the active item
  const findActiveItem = () => {
    if (!activeId || !activeContainer) return null

    const container = containers.find((container) => container.id === activeContainer)
    if (!container) return null

    return container.items.find((item) => item.id === activeId)
  }

  // Get the active item
  const activeItem = findActiveItem()

  return (
    <div className='flex -mx-2 pb-4 h-full'>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {containers.map((container) => (
          <BoardColumn key={container.id} id={container.id} title={container.title} items={container.items}>
            <SortableContext items={container.items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
              {container.items.map((item) => (
                <TaskItemDragable key={item.id} id={item.id}>
                  <TaskItem title={item.content}></TaskItem>
                </TaskItemDragable>
              ))}
            </SortableContext>
          </BoardColumn>
        ))}
        <DragOverlay>
          {activeItem ? (
            <TaskItemWrapper isDragging={true}>
              <TaskItem title={activeItem.content}></TaskItem>
            </TaskItemWrapper>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
