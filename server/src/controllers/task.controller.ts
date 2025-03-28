import { Request, Response } from 'express'
import taskServices from '@/services/task.service'
import { HTTP_STATUS } from '@/types/httpStatus.d'

const getTaskList = async (req: Request, res: Response) => {
  const result = await taskServices.getTaskList()
  res.status(HTTP_STATUS.OK).json(result)
}

const getTask = async (req: Request, res: Response) => {
  const result = await taskServices.getTask(req.params.id)
  res.status(HTTP_STATUS.OK).json(result)
}

const createTask = async (req: Request, res: Response) => {
  const result = await taskServices.createTask(req.body)
  res.status(HTTP_STATUS.CREATED).json(result)
}

const updateTask = async (req: Request, res: Response) => {
  const result = await taskServices.updateTask(req.params.id, req.body)
  res.status(HTTP_STATUS.CREATED).json(result)
}

const deleteTask = async (req: Request, res: Response) => {
  await taskServices.deleteTask(req.params.id)
  res.status(HTTP_STATUS.OK).json({})
}

export { getTaskList, getTask, createTask, updateTask, deleteTask }
