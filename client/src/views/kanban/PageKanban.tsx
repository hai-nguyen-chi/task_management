import KanbanBoard from '@/views/kanban/KanbanBoard'

export default function Home() {
  return (
    <main className='flex flex-col h-screen'>
      <h1 className='text-2xl font-bold p-4'>Kanban Board</h1>
      <div className='flex-1 overflow-hidden'>
        <KanbanBoard />
      </div>
    </main>
  )
}
