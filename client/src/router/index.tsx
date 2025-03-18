import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const MainLayout = lazy(() => import('@/layouts/MainLayout'))

const Login = lazy(() => import('@/views/Login'))
const BoardContainer = lazy(() => import('@/views/board/BoardContainer'))

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
  }
]

export default routes
