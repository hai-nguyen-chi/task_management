import { Request, Response } from 'express'
import { HTTP_STATUS } from '@/types/httpStatus'
import sprintService from '@/services/sprint.service'

const createSprintController = async (req: Request, res: Response) => {
  const result = await sprintService.createSprint(req.body)
  res.status(HTTP_STATUS.CREATED).json(result)
}

const getSprintListController = async (req: Request, res: Response) => {
  const results = await sprintService.getSprintList()
  res.status(HTTP_STATUS.OK).json(results)
}

const getSprintController = async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await sprintService.getSprint(id)
  res.status(HTTP_STATUS.OK).json(result)
}

const updateSprintController = async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body
  const result = await sprintService.updateSprint(id, payload)
  res.status(HTTP_STATUS.OK).json(result)
}

const deleteSprintController = async (req: Request, res: Response) => {
  const id = req.params.id
  await sprintService.deleteSprint(id)
  res.status(HTTP_STATUS.NO_CONTENT).json()
}

export {
  createSprintController,
  getSprintListController,
  getSprintController,
  updateSprintController,
  deleteSprintController
}
