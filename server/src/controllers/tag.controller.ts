import { Request, Response } from 'express'
import { HTTP_STATUS } from '@/types/httpStatus'
import tagService from '@/services/tag.service'

const createTagController = async (req: Request, res: Response) => {
  const result = await tagService.createTag(req.body)
  res.status(HTTP_STATUS.CREATED).json(result)
}

const getTagListController = async (req: Request, res: Response) => {
  const results = await tagService.getTagList()
  res.status(HTTP_STATUS.OK).json(results)
}

const getTagController = async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await tagService.getTag(id)
  res.status(HTTP_STATUS.OK).json(result)
}

const updateTagController = async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body
  const result = await tagService.updateTag(id, payload)
  res.status(HTTP_STATUS.OK).json(result)
}

const deleteTagController = async (req: Request, res: Response) => {
  const id = req.params.id
  await tagService.deleteTag(id)
  res.status(HTTP_STATUS.NO_CONTENT).json()
}

export { createTagController, getTagListController, getTagController, updateTagController, deleteTagController }
