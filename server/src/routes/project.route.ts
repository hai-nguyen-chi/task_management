import { Router } from 'express'
import { accessTokenValidator } from '@/middlewares/auth.middleware'
import { wrapHandler } from '@/utils/errorHandler'
import {
  createProjectController,
  getProjectListController,
  getProjectController,
  updateProjectController,
  deleteProjectController
} from '@/controllers/project.controller'
import { checkPermissionAccess } from '@/middlewares/permission.middleware'
import { Permissions } from '@/utils/permission'

const projectRoute = Router()

projectRoute.post(
  '/project',
  accessTokenValidator,
  checkPermissionAccess([Permissions.create_project]),
  wrapHandler(createProjectController)
)
projectRoute.get('/projects', accessTokenValidator, wrapHandler(getProjectListController))
projectRoute.get('/project/:id', accessTokenValidator, wrapHandler(getProjectController))
projectRoute.put(
  '/project/:id',
  accessTokenValidator,
  checkPermissionAccess([Permissions.update_project]),
  wrapHandler(updateProjectController)
)
projectRoute.delete('/project/:id', accessTokenValidator, wrapHandler(deleteProjectController))

export default projectRoute
