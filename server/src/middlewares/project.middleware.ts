import { Request, Response, NextFunction } from 'express'
import { UserProjectRole } from '@/types/user'

type Mode = 'AND' | 'OR'

const isProjectMember = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.decoded_authorization
    if (!user || !Array.isArray(user.projects)) {
      res.status(403).json()
      return
    }
    const hasProject = user.projects.some((p: UserProjectRole) => p.project_id.toString() === req.params.id)
    if (!hasProject) {
      res.status(403).json()
      return
    }
    next()
  }
}

const isProjectAdmin = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.decoded_authorization
    if (!user || !Array.isArray(user.projects)) {
      res.status(403).json()
      return
    }
    const hasProjectAdmin = user.projects.some(
      (p: UserProjectRole) => p.project_id.toString() === req.params.id && p.isAdmin
    )
    if (!hasProjectAdmin) {
      res.status(403).json()
      return
    }
    next()
  }
}

export { isProjectMember, isProjectAdmin }
