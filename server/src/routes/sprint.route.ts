import { Router } from 'express'
import { accessTokenValidator } from '@/middlewares/auth.middleware'
import { wrapHandler } from '@/utils/errorHandler'
import {
  createSprintController,
  getSprintListController,
  getSprintController,
  updateSprintController,
  deleteSprintController
} from '@/controllers/sprint.controller'

const sprintRoute = Router()

sprintRoute.post('/sprint', accessTokenValidator, wrapHandler(createSprintController))
sprintRoute.get('/sprints', accessTokenValidator, wrapHandler(getSprintListController))
sprintRoute.get('/sprint/:id', accessTokenValidator, wrapHandler(getSprintController))
sprintRoute.put('/sprint/:id', accessTokenValidator, wrapHandler(updateSprintController))
sprintRoute.delete('/sprint/:id', accessTokenValidator, wrapHandler(deleteSprintController))

export default sprintRoute
