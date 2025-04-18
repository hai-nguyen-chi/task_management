import { Button } from '@/components/ui/button.tsx'
import { MoreHorizontal, Search } from 'lucide-react'
import { Input } from '@/components/ui/input.tsx'
import DataTable from '@/components/core/table/data-table.tsx'
import { ColumnDef } from '@tanstack/react-table'
import { FaRegStar } from 'react-icons/fa'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import AvatarProject from '@/components/icons/AvatarProject.tsx'

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'favorite',
    header: 'Favorite',
    cell: () => <FaRegStar className='size-5' />
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const avatar = row.original.avatar
      return (
        <div className='flex items-center'>
          <div className='size-6 mr-2'>{avatar}</div>
          {row.getValue('name')}
        </div>
      )
    }
  },
  {
    accessorKey: 'key',
    header: 'Key',
    cell: ({ row }) => <div>{row.getValue('key')}</div>
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => <div>{row.getValue('type')}</div>
  },
  {
    accessorKey: 'lead',
    header: 'Lead',
    cell: ({ row }) => {
      const lead = row.original.lead
      return (
        <div className='flex items-center'>
          <Avatar className='mr-2'>
            <AvatarImage src={lead.avatar} alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {lead.name}
        </div>
      )
    }
  },
  {
    accessorKey: 'projectUrl',
    header: 'Project URL',
    cell: ({ row }) => <div className='lowercase'>{row.getValue('projectUrl')}</div>
  },
  {
    accessorKey: 'moreActions',
    header: 'More actions',
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

const data: any[] = [
  {
    id: 'm5gr84i9',
    avatar: <AvatarProject />,
    name: 'DS-task',
    key: 'DS',
    type: 'Team-managed business',
    lead: {
      avatar: 'https://github.com/shadcn.png',
      name: 'Junichi Kayamoto'
    },
    projectUrl: ''
  }
]

const Project = () => {
  return (
    <main className='px-4 h-screen'>
      <div className='flex items-center justify-between mt-6'>
        <div className='text-primary text-[24px] font-medium'>Projects</div>
        <div>
          <Button className='bg-[#0C66E4] text-white'>Create project</Button>
          <Button className='ml-2 bg-[#091E420F] text-primary'>Templates</Button>
        </div>
      </div>
      <div className='my-4'>
        <div className='relative w-[280px]'>
          <div className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
            <Search className='h-5 w-5' />
          </div>
          <Input
            id='search'
            type='text'
            placeholder='Search Projects'
            className='pr-10 h-[36px] w-[280px] text-[14px]'
          />
        </div>
      </div>
      <div className='mt-8'>
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  )
}

export default Project
