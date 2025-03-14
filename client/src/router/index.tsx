import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const MainLayout = lazy(() => import('@/layouts/MainLayout'))

const Login = lazy(() => import('@/views/Login'))
const BoardContainer = lazy(() => import('@/views/board/BoardContainer'))
const PageKanban = lazy(() => import('@/views/kanban/PageKanban'))

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <BoardContainer />
      }
    ]
  },
  {
    path: '/kanban',
    element: <PageKanban />
  }
]

export default routes
