import { config } from 'dotenv'
import { ObjectId } from 'mongodb'
import databaseService from '@/services/database.service'
import TaskSchema from '@/models/Task.schema'
import { TaskStatusMap, TaskDTO, TaskStatus } from '@/constants/task.constants'
import _ from 'lodash'

config()

class TaskServices {
  async getTaskList() {
    return (await databaseService.tasks.find({}).toArray()).map((task: TaskSchema) => ({
      ...task,
      status: TaskStatusMap[task.status]
    }))
  }
  async getTask(id: string) {
    const _id = new ObjectId(id)
    const task = await databaseService.tasks.findOne({ _id })
    if (task) {
      return {
        ...task,
        status: TaskStatusMap[task.status]
      }
    }
  }
  async createTask(payload: TaskDTO) {
    const _id = new ObjectId()
    const task = new TaskSchema({
      ...payload,
      _id,
      description: '',
      status: TaskStatus[payload.status],
      tags: []
    })
    return await databaseService.tasks.insertOne(task)
  }
  async updateTask(id: string, payload: TaskDTO) {
    const _id = new ObjectId(id)
    const task = _.omit(payload, ['_id', 'updated_at'])
    return await databaseService.tasks.updateOne(
      { _id },
      {
        $set: {
          ...task,
          status: TaskStatus[task.status]
        },
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
