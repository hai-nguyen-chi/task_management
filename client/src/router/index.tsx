import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const MainLayout = lazy(() => import('@/layouts/MainLayout'))
const SubLayout = lazy(() => import('@/layouts/SubLayout'))

const Login = lazy(() => import('@/pages/Login'))
const Board = lazy(() => import('@/pages/Board'))
const Project = lazy(() => import('@/pages/Project'))

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />
  },
  {
    element: <SubLayout />,
    children: [
      {
        path: '/project',
        element: <Project />
      }
    ]
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: '/project/board',
        element: <Board />
      }
    ]
  }
]

export default routes
