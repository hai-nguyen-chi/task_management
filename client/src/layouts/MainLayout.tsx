import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from '@/layouts/parts/SideBar.tsx'
import Header from '@/layouts/parts/Header.tsx'

const MainLayout = () => {
  const isAuthenticated = localStorage.getItem('access_token')
  return isAuthenticated ? (
    <>
      <Header />
      <div className='grid grid-cols-12 gap-4 px-4 h-[calc(100vh-60px)]'>
        <div className='col-span-2'>
          <Sidebar />
        </div>
        <div className='col-span-10 overflow-hidden'>
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <Navigate to='/login' />
  )
}

export default MainLayout
