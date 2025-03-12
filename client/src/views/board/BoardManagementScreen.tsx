'use client'

import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
  type UniqueIdentifier
} from '@dnd-kit/core'
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { TaskColumn } from '@/views/board/task/TaskColumn'
import { TaskItemDragable } from '@/views/board/task/TaskItemDragable'
import { TaskItem } from '@/views/board/task/TaskItem'

// Define the structure of our items
type ItemType = {
  id: UniqueIdentifier
  content: string
}

// Define the structure of our containers
type ContainerType = {
  id: UniqueIdentifier
  title: string
  items: ItemType[]
}

export default function SortableContainers() {
  // Initial state with 4 columns and their items
  const [containers, setContainers] = useState<ContainerType[]>([
    {
      id: 'columnA',
      title: 'Column A',
      items: [
        { id: 'A1', content: 'A1' },
        { id: 'A2', content: 'A2' },
        { id: 'A3', content: 'A3' }
      ]
    },
    {
      id: 'columnB',
      title: 'Column B',
      items: [
        { id: 'B1', content: 'B1' },
        { id: 'B2', content: 'B2' },
        { id: 'B3', content: 'B3' }
      ]
    },
    {
      id: 'columnC',
      title: 'Column C',
      items: [
        { id: 'C1', content: 'C1' },
        { id: 'C2', content: 'C2' },
        { id: 'C3', content: 'C3' }
      ]
    },
    {
      id: 'columnD',
      title: 'Column D',
      items: [
        { id: 'D1', content: 'D1' },
        { id: 'D2', content: 'D2' },
        { id: 'D3', content: 'D3' }
      ]
    }
  ])

  // Keep track of active item and container
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [activeContainer, setActiveContainer] = useState<UniqueIdentifier | null>(null)

  // Configure sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  // Find the container that contains an item
  const findContainer = (id: UniqueIdentifier) => {
    if (id in containers) return id

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
    <div className='flex flex-col'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Sortable Multiple Containers</h1>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {containers.map((container) => (
            <TaskColumn key={container.id} id={container.id} title={container.title}>
              <SortableContext items={container.items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                {container.items.map((item) => (
                  <TaskItemDragable key={item.id} id={item.id}>
                    <TaskItem>{item.content}</TaskItem>
                  </TaskItemDragable>
                ))}
              </SortableContext>
            </TaskColumn>
          ))}
        </div>

        <DragOverlay>{activeItem ? <TaskItem>{activeItem.content}</TaskItem> : null}</DragOverlay>
      </DndContext>
    </div>
  )
}
