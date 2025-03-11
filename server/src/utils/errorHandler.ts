/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import { HTTP_STATUS } from '@/constants/httpStatus.constants'
import lodash from 'lodash'
import { ErrorWithStatus } from '@/models/Error.schema'

const wrapHandler = (callback: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

const errorHandlerDefault = (err: any, req: Request, res: Response, next: NextFunction) => {
  const errResponse = err instanceof ErrorWithStatus ? lodash.omit(err, ['status']) : err
  res.status(err.status || HTTP_STATUS.UNPROCESSABLE_ENTITY).json(errResponse)
}

export { wrapHandler, errorHandlerDefault }
