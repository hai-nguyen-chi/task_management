import AvatarProject from '@/components/icons/AvatarProject.tsx'
import { cn } from '@/lib/utils'
import { Globe, BarChart2, FileText, LayoutGrid, Calendar, List, LineChart } from 'lucide-react'

interface NavItemProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  href?: string
}

const NavItem = ({ icon, label, isActive, href = '#' }: NavItemProps) => {
  return (
    <a
      href={href}
      className={cn(
        'flex items-center gap-4 px-3 py-2 text-sm font-normal rounded-md',
        isActive ? 'text-blue-700 rounded-none border-l-2 border-blue-700' : 'text-gray-700 hover:bg-blue-50'
      )}
    >
      <span className='flex-shrink-0 w-5 h-5'>{icon}</span>
      <span>{label}</span>
    </a>
  )
}

const SideBar = () => {
  return (
    <div className='border-r-2 h-full'>
      <div className='flex items-center pt-6'>
        <AvatarProject className='size-6' />
        <div className='ml-2'>
          <div className='text-[14px] font-black text-primary'>TRADOM Solution Dev</div>
          <div className='text-[12px] font-normal text-[#626F86]'>Software project</div>
        </div>
      </div>
      <div className='mt-5 pr-4'>
        <NavItem icon={<Globe className='h-5 w-5' />} label='Summary' />
        <NavItem icon={<BarChart2 className='h-5 w-5' />} label='Timeline' />
        <NavItem icon={<FileText className='h-5 w-5' />} label='Backlog' isActive={true} />
        <NavItem icon={<LayoutGrid className='h-5 w-5' />} label='Board' />
        <NavItem icon={<Calendar className='h-5 w-5' />} label='Calendar' />
        <NavItem icon={<List className='h-5 w-5' />} label='List' />
        <NavItem icon={<LineChart className='h-5 w-5' />} label='Reports' />
      </div>
    </div>
  )
}

export default SideBar
