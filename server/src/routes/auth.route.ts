import { Router } from 'express'
import { wrapHandler } from '@/utils/errorHandler'
import {
  changePasswordController,
  forgotPasswordController,
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
  resendVerifyEmailTokenController,
  resetPasswordController,
  verifyEmailTokenController
} from '@/controllers/auth.controller'
import {
  registerValidator,
  loginValidator,
  accessTokenValidator,
  refreshTokenValidator,
  verifyEmailTokenValidator,
  changePasswordValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} from '@/middlewares/auth.middleware'

const authRoute = Router()

authRoute.post('/register', registerValidator, wrapHandler(registerController))
authRoute.post('/login', loginValidator, wrapHandler(loginController))
authRoute.post('/logout', accessTokenValidator, refreshTokenValidator, wrapHandler(logoutController))
authRoute.post('/refresh-token', refreshTokenValidator, wrapHandler(refreshTokenController))
authRoute.post('/verify-email', verifyEmailTokenValidator, wrapHandler(verifyEmailTokenController))
authRoute.post('/resend-verify-email', accessTokenValidator, wrapHandler(resendVerifyEmailTokenController))
authRoute.post('/change-password', changePasswordValidator, wrapHandler(changePasswordController))
authRoute.post('/forgot-password', forgotPasswordValidator, wrapHandler(forgotPasswordController))
authRoute.post('/reset-password', resetPasswordValidator, wrapHandler(resetPasswordController))

export default authRoute
