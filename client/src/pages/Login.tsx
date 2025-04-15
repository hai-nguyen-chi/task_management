import LoginForm from '@/components/auth/LoginForm.tsx'

const Login = () => {
  return (
    <main className='flex-1 flex items-center justify-center p-4 h-screen'>
      <img src='kanban_login.jpg' alt='Kanban' width='500' height='600' />
      <div className='w-full max-w-md ml-10'>
        <LoginForm />
      </div>
    </main>
  )
}

export default Login
