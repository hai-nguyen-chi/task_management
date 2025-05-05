import { Request, Response, NextFunction } from 'express'

type Mode = 'AND' | 'OR'

const checkPermissionAccess = (permissions: string[], mode: Mode = 'AND') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.decoded_authorization
    if (!user || !Array.isArray(user.permissions)) {
      res.status(403).json()
      return
    }

    const hasPermission =
      mode === 'AND'
        ? permissions.every((p) => user.permissions.includes(p))
        : permissions.some((p) => user.permissions.includes(p))

    if (!hasPermission) {
      res.status(403).json()
      return
    }
    next()
  }
}

export { checkPermissionAccess }
