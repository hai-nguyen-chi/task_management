import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/sidebar/SideBar'

const MainLayout = () => {
  return (
    <div className='grid grid-cols-12 gap-4 p-4 h-screen'>
      <div className='col-span-2'>
        <Sidebar />
      </div>
      <div className='col-span-10 overflow-hidden'>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
