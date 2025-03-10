import { Router } from 'express'
import { wrapHandler } from '@/utils/errorHandler'
import { getTaskList, getTask, createTask, updateTask, deleteTask } from '@/controllers/task.controller'

const taskRoute = Router()

taskRoute.get('/tasks', wrapHandler(getTaskList))
taskRoute.get('/task/:id', wrapHandler(getTask))
taskRoute.post('/task', wrapHandler(createTask))
taskRoute.put('/task/:id', wrapHandler(updateTask))
taskRoute.delete('/task/:id', wrapHandler(deleteTask))

export default taskRoute
