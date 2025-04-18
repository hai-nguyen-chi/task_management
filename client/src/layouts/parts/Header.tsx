import { Logo } from '@/components/icons/Logo.tsx'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input.tsx'
import { Search } from 'lucide-react'
import { BsBellFill, BsFillQuestionCircleFill } from 'react-icons/bs'
import { IoIosSettings } from 'react-icons/io'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Header = () => {
  return (
    <div className='h-[60px] flex justify-between items-center px-4 border-b'>
      <div className='flex'>
        <Logo />
        <Tabs defaultValue='account' className='ml-5'>
          <TabsList className='h-[60px] bg-transparent py-0'>
            <TabsTrigger
              value='account'
              className='w-20 relative border-0 rounded-none data-[state=active]:shadow-none data-[state=active]:text-blue-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full data-[state=active]:after:bg-blue-500 '
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value='password'
              className='w-20 relative border-0 rounded-none data-[state=active]:shadow-none data-[state=active]:text-blue-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full data-[state=active]:after:bg-blue-500'
            >
              Teams
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className='flex items-center'>
        <div className='relative'>
          <div className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
            <Search className='h-5 w-5' />
          </div>
          <Input id='search' type='text' placeholder='Search' className='pl-10 h-[36px] w-[280px] text-[14px]' />
        </div>
        <BsBellFill className='size-[28px] transform-[rotate(45deg)] mx-3 p-1' />
        <BsFillQuestionCircleFill className='size-[28px] mx-3 p-1' />
        <IoIosSettings className='size-[34px] mx-3 p-1' />
        <Avatar className='ml-3'>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default Header
