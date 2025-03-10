import { config } from 'dotenv'
import { ObjectId } from 'mongodb'
import databaseService from '@/services/database.service'
import TaskSchema from '@/models/Task.schema'
import { TaskObject, TaskStatus } from '@/constants/task.constants'
import _ from 'lodash'

config()

class TaskServices {
  async getTaskList() {
    return await databaseService.tasks.find({}).toArray()
  }
  async getTask(id: string) {
    const _id = new ObjectId(id)
    return await databaseService.tasks.findOne({ _id })
  }
  async createTask(payload: TaskObject) {
    const _id = new ObjectId()
    const task = new TaskSchema({
      ...payload,
      _id,
      description: '',
      status: TaskStatus.Backlog,
      tags: []
    })
    await databaseService.tasks.insertOne(task)
    return task
  }
  async updateTask(id: string, payload: TaskObject) {
    const _id = new ObjectId(id)
    return await databaseService.tasks.updateOne(
      { _id },
      {
        $set: _.omit(payload, ['_id', 'updated_at']),
        $currentDate: {
          updated_at: true
        }
      }
    )
  }
  async deleteTask(id: string) {
    const _id = new ObjectId(id)
    await databaseService.tasks.deleteOne({ _id })
  }
}

const taskServices = new TaskServices()
export default taskServices
