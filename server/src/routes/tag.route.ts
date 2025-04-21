import { Router } from 'express'
import { accessTokenValidator } from '@/middlewares/auth.middleware'
import { wrapHandler } from '@/utils/errorHandler'
import {
  createTagController,
  getTagListController,
  getTagController,
  updateTagController,
  deleteTagController
} from '@/controllers/tag.controller'

const tagRoute = Router()

tagRoute.post('/tag', accessTokenValidator, wrapHandler(createTagController))
tagRoute.get('/tags', accessTokenValidator, wrapHandler(getTagListController))
tagRoute.get('/tag/:id', accessTokenValidator, wrapHandler(getTagController))
tagRoute.put('/tag/:id', accessTokenValidator, wrapHandler(updateTagController))
tagRoute.delete('/tag/:id', accessTokenValidator, wrapHandler(deleteTagController))

export default tagRoute
