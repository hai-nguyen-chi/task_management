import { Request, Response } from 'express'
import projectService from '@/services/project.service'
import { HTTP_STATUS } from '@/types/httpStatus'

const createProjectController = async (req: Request, res: Response) => {
  const result = await projectService.createProject(req.body)
  res.status(HTTP_STATUS.CREATED).json(result)
}

const getProjectListController = async (req: Request, res: Response) => {
  const results = await projectService.getProjectList()
  res.status(HTTP_STATUS.OK).json(results)
}

const getProjectController = async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await projectService.getProject(id)
  res.status(HTTP_STATUS.OK).json(result)
}

const updateProjectController = async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body
  const result = await projectService.updateProject(id, payload)
  res.status(HTTP_STATUS.OK).json(result)
}

const deleteProjectController = async (req: Request, res: Response) => {
  const id = req.params.id
  await projectService.deleteProject(id)
  res.status(HTTP_STATUS.NO_CONTENT).json()
}

export {
  createProjectController,
  getProjectListController,
  getProjectController,
  updateProjectController,
  deleteProjectController
}
