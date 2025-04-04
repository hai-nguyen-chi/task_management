import { Request, Response } from 'express'
import authService from '@/services/auth.service'
import { HTTP_STATUS } from '@/types/httpStatus'
import { TokenPayload } from '@/types/refreshToken'

const changePasswordController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  await authService.changePassword({
    email,
    password
  })
  res.status(HTTP_STATUS.NO_CONTENT).json()
}

const registerController = async (req: Request, res: Response) => {
  const result = await authService.register(req.body)
  res.status(HTTP_STATUS.CREATED).json(result)
}

const loginController = async (req: Request, res: Response) => {
  const result = await authService.login(req.body)
  res.status(HTTP_STATUS.OK).json(result)
}

const logoutController = async (req: Request, res: Response) => {
  await authService.logout(req.body)
  res.status(HTTP_STATUS.NO_CONTENT).json()
}

const refreshTokenController = async (req: Request, res: Response) => {
  const { refresh_token } = req.body
  const { user_id, exp } = req.decoded_refresh_token as TokenPayload
  const result = await authService.refreshToken({
    user_id,
    exp,
    refresh_token
  })
  res.status(HTTP_STATUS.OK).json(result)
}

const resendVerifyEmailTokenController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  await authService.resendVerifyEmail(user_id)
  res.status(HTTP_STATUS.NOT_FOUND).json()
}

const verifyEmailTokenController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_email_verify_token as TokenPayload
  const result = await authService.verifyEmail(user_id)
  res.status(HTTP_STATUS.OK).json(result)
}

const forgotPasswordController = async (req: Request, res: Response) => {
  const { email } = req.body
  await authService.forgotPassword(email)
  res.status(HTTP_STATUS.NOT_FOUND).json()
}
const resetPasswordController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_forgot_password_token as TokenPayload
  const { password } = req.body
  const result = await authService.resetPassword(user_id, password)
  res.status(HTTP_STATUS.OK).json(result)
}

export {
  changePasswordController,
  registerController,
  loginController,
  logoutController,
  refreshTokenController,
  resendVerifyEmailTokenController,
  verifyEmailTokenController,
  forgotPasswordController,
  resetPasswordController
}
