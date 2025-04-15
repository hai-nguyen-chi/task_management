import { apiService, configHeaders } from '@/services/index.ts'

interface LoginPayload {
  email: string
  password: string
}

const login = (payload: LoginPayload) => {
  return apiService.post('/auth/login', payload, {
    headers: configHeaders()
  })
}

export { login }
