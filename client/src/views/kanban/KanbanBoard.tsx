'use client'

import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
  type UniqueIdentifier
} from '@dnd-kit/core'
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Column } from './Column'
import { Card } from './Card'

// Define types for our data
type CardType = {
  id: string
  content: string
  columnId: string
  color: string
}

type ColumnType = {
  id: string
  title: string
  cards: CardType[]
}

export default function KanbanBoard() {
  // Initial data for the board
  const [columns, setColumns] = useState<ColumnType[]>([
    {
      id: 'column-a',
      title: 'Column A',
      cards: [
        { id: 'a1', content: 'A1', columnId: 'column-a', color: 'bg-blue-500' },
        { id: 'a2', content: 'A2', columnId: 'column-a', color: 'bg-blue-500' },
        { id: 'a3', content: 'A3', columnId: 'column-a', color: 'bg-blue-500' }
      ]
    },
    {
      id: 'column-b',
      title: 'Column B',
      cards: [
        { id: 'b1', content: 'B1', columnId: 'column-b', color: 'bg-yellow-500' },
        { id: 'b2', content: 'B2', columnId: 'column-b', color: 'bg-yellow-500' },
        { id: 'b3', content: 'B3', columnId: 'column-b', color: 'bg-yellow-500' },
        { id: 'd1', content: 'D1', columnId: 'column-b', color: 'bg-pink-500' },
        { id: 'd3', content: 'D3', columnId: 'column-b', color: 'bg-pink-500' }
      ]
    },
    {
      id: 'column-c',
      title: 'Column C',
      cards: [
        { id: 'c1', content: 'C1', columnId: 'column-c', color: 'bg-teal-500' },
        { id: 'c2', content: 'C2', columnId: 'column-c', color: 'bg-teal-500' },
        { id: 'c3', content: 'C3', columnId: 'column-c', color: 'bg-teal-500' },
        { id: 'd2', content: 'D2', columnId: 'column-c', color: 'bg-pink-500' }
      ]
    },
    {
      id: 'column-d',
      title: 'Column D',
      cards: []
    }
  ])

  // State for active card and column
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [activeColumn, setActiveColumn] = useState<UniqueIdentifier | null>(null)

  // State for modal

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8 // Only activate after moving 8px - helps distinguish between click and drag
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  // Find the column that contains a card
  const findColumn = (id: UniqueIdentifier) => {
    // Check if the id is a column id
    const column = columns.find((column) => column.id === id)
    if (column) return id

    // Check if the id is a card id
    return columns.find((column) => column.cards.some((card) => card.id === id))?.id
  }

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const id = active.id
    const columnId = findColumn(id)

    if (columnId) {
      setActiveId(id)
      setActiveColumn(columnId)
    }
  }

  // Handle drag over
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over) return

    const activeId = active.id
    const overId = over.id

    // Find the columns
    const activeColumnId = findColumn(activeId)
    const overColumnId = findColumn(overId)

    if (!activeColumnId || !overColumnId || activeColumnId === overColumnId) {
      return
    }

    setColumns((prev) => {
      const activeColumn = prev.find((column) => column.id === activeColumnId)
      const overColumn = prev.find((column) => column.id === overColumnId)

      if (!activeColumn || !overColumn) return prev

      // Find the index of the active card
      const activeCardIndex = activeColumn.cards.findIndex((card) => card.id === activeId)

      // Create a new array with the active card removed
      const newActiveColumnCards = [...activeColumn.cards]
      const [removedCard] = newActiveColumnCards.splice(activeCardIndex, 1)

      // Update the card's columnId
      const updatedCard = { ...removedCard, columnId: overColumnId as string }

      // Add the active card to the new column
      const newOverColumnCards = [...overColumn.cards, updatedCard]

      return prev.map((column) => {
        if (column.id === activeColumnId) {
          return {
            ...column,
            cards: newActiveColumnCards
          }
        }

        if (column.id === overColumnId) {
          return {
            ...column,
            cards: newOverColumnCards
          }
        }

        return column
      })
    })

    setActiveColumn(overColumnId)
  }

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveId(null)
      setActiveColumn(null)
      return
    }

    const activeId = active.id
    const overId = over.id

    // Find the columns
    const activeColumnId = findColumn(activeId)
    const overColumnId = findColumn(overId)

    if (!activeColumnId || !overColumnId) {
      setActiveId(null)
      setActiveColumn(null)
      return
    }

    // If the card was dropped in a different column, we handled it in handleDragOver
    if (activeColumnId !== overColumnId) {
      setActiveId(null)
      setActiveColumn(null)
      return
    }

    // Find the column
    const columnIndex = columns.findIndex((column) => column.id === activeColumnId)
    const column = columns[columnIndex]

    // Find the indices of the active and over cards
    const activeIndex = column.cards.findIndex((card) => card.id === activeId)

    // If dropping on a column, place at the end
    if (overId === overColumnId) {
      setActiveId(null)
      setActiveColumn(null)
      return
    }

    const overIndex = column.cards.findIndex((card) => card.id === overId)

    // If the indices are the same, no need to do anything
    if (activeIndex === overIndex) {
      setActiveId(null)
      setActiveColumn(null)
      return
    }

    // Reorder the cards in the column
    setColumns((prev) => {
      const newColumns = [...prev]
      const newColumn = { ...newColumns[columnIndex] }
      newColumn.cards = arrayMove(newColumn.cards, activeIndex, overIndex)
      newColumns[columnIndex] = newColumn
      return newColumns
    })

    setActiveId(null)
    setActiveColumn(null)
  }

  // Find the active card
  const findActiveCard = () => {
    if (!activeId || !activeColumn) return null

    const column = columns.find((column) => column.id === activeColumn)
    if (!column) return null

    return column.cards.find((card) => card.id === activeId)
  }

  // Get the active card
  const activeCard = findActiveCard()

  // Handle card click to open modal

  return (
    <div className='flex gap-4 h-full overflow-x-auto pb-4 px-4'>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {columns.map((column) => (
          <Column key={column.id} id={column.id} title={column.title}>
            <SortableContext items={column.cards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
              {column.cards.map((card) => (
                <Card key={card.id} id={card.id} content={card.content} color={card.color} onClick={() => {}} />
              ))}
            </SortableContext>
          </Column>
        ))}

        {/* Drag overlay to show the card being dragged */}
        <DragOverlay>
          {activeCard ? (
            <Card id={activeCard.id} content={activeCard.content} color={activeCard.color} isDragging />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Modal for card details */}
    </div>
  )
}
