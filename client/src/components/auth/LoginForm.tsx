import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { login as apiLogin } from '@/services/auth.service'
import { login as storeLogin } from '@/store/authSlice.ts'
import { useAppDispatch } from '@/hooks/index.ts'

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setEmail(e.target.value)
  }

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setPassword(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const payload = {
      email,
      password
    }
    setIsLoading(true)

    try {
      const loginResponse = await apiLogin(payload)
      const { data } = loginResponse
      dispatch(storeLogin(data))
    } catch (error) {
      console.error('Axios error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='email' className='text-[20px]'>
            Email
          </Label>
          <div className='relative'>
            <div className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
              <MailIcon className='h-5 w-5' />
            </div>
            <Input
              id='email'
              type='email'
              placeholder='name@example.com'
              required
              className='pl-10 h-[48px] text-[14px]'
              value={email}
              onChange={changeEmail}
            />
          </div>
        </div>

        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <Label htmlFor='password' className='text-[20px]'>
              Password
            </Label>
            <Link to='#' className='text-xs text-purple-600 hover:underline text-[14px]'>
              Forgot password ?
            </Link>
          </div>
          <div className='relative'>
            <div className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
              <LockIcon className='h-5 w-5' />
            </div>
            <Input
              id='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='password'
              required
              className='pl-10 h-[48px] text-[14px]'
              value={password}
              onChange={changePassword}
            />
            <Button
              type='button'
              variant='ghost'
              size='sm'
              className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className='h-5 w-5 text-muted-foreground' />
              ) : (
                <EyeIcon className='h-5 w-5 text-muted-foreground' />
              )}
              <span className='sr-only'>{showPassword ? 'Hide password' : 'Show password'}</span>
            </Button>
          </div>
        </div>

        <Button type='submit' className='w-full h-[48px] text-[16px] text-white' disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
      <div className='relative py-4'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <Button variant='outline' type='button' className='w-full h-[48px] text-[16px]'>
          <svg className='mr-2 h-4 w-4' viewBox='0 0 24 24'>
            <path
              d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
              fill='#4285F4'
            />
            <path
              d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
              fill='#34A853'
            />
            <path
              d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
              fill='#FBBC05'
            />
            <path
              d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
              fill='#EA4335'
            />
            <path d='M1 1h22v22H1z' fill='none' />
          </svg>
          Google
        </Button>
        <Button variant='outline' type='button' className='w-full h-[48px] text-[16px]'>
          <svg className='mr-2 h-4 w-4' fill='blue' viewBox='0 0 24 24'>
            <path d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' />
          </svg>
          Facebook
        </Button>
      </div>

      <div className='text-center text-[16px] mt-4'>
        Don&apos;t have an account?{' '}
        <Link to='#' className='text-purple-600 hover:underline'>
          Sign up
        </Link>
      </div>
    </div>
  )
}

export default LoginForm
