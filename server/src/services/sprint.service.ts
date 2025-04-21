import { config } from 'dotenv'
import databaseService from '@/services/database.service'
import { ObjectId } from 'mongodb'
import _ from 'lodash'
import SprintSchema from '@/models/Sprint.schema'
import { SprintDTO, SprintStatus } from '@/types/sprint'

config()

class SprintService {
  async createSprint(payload: SprintDTO) {
    const _id = new ObjectId()
    return await databaseService.sprints.insertOne(
      new SprintSchema({
        ...payload,
        status: SprintStatus.ToDo,
        _id
      })
    )
  }
  async getSprintList() {
    return await databaseService.sprints.find({}).toArray()
  }
  async getSprint(id: string) {
    const _id = new ObjectId(id)
    return await databaseService.sprints.findOne({ _id })
  }
  async updateSprint(id: string, payload: SprintDTO) {
    const _id = new ObjectId(id)
    return await databaseService.sprints.updateOne(
      { _id },
      {
        $set: _.omit(payload, ['_id', 'updated_at']),
        $currentDate: {
          updated_at: true
        }
      }
    )
  }
  async deleteSprint(id: string) {
    const _id = new ObjectId(id)
    await databaseService.sprints.deleteOne({ _id })
  }
}

const sprintService = new SprintService()

export default sprintService
