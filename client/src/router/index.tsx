import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const MainLayout = lazy(() => import('@/layouts/MainLayout'))

const Login = lazy(() => import('@/views/Login'))
const BoardManagementScreen = lazy(() => import('@/views/board/BoardManagementScreen'))

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
        element: <BoardManagementScreen />
      }
    ]
  }
]

export default routes
