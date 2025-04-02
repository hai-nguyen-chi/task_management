import { Router } from 'express'
import { wrapHandler } from '@/utils/errorHandler'

const authRoute = Router()

authRoute.get('/register', wrapHandler(() => {}))

export default authRoute
