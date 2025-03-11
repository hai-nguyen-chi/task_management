import { Router } from 'express'
import { wrapHandler } from '@/utils/errorHandler'
import { getTaskList, getTask, createTask, updateTask, deleteTask } from '@/controllers/task.controller'
import { taskSchemaValidator } from '@/middlewares/task.middleware'

const taskRoute = Router()

taskRoute.get('/tasks', wrapHandler(getTaskList))
taskRoute.get('/task/:id', wrapHandler(getTask))
taskRoute.post('/task', taskSchemaValidator, wrapHandler(createTask))
taskRoute.put('/task/:id', taskSchemaValidator, wrapHandler(updateTask))
taskRoute.delete('/task/:id', wrapHandler(deleteTask))

export default taskRoute
