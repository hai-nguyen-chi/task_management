import { config } from 'dotenv'
import databaseService from '@/services/database.service'
import { ObjectId } from 'mongodb'
import _ from 'lodash'
import TagSchema from '@/models/Tag.schema'
import { TagDTO } from '@/types/tag'

config()

class TagService {
  async createTag(payload: TagDTO) {
    const _id = new ObjectId()
    return await databaseService.tags.insertOne(
      new TagSchema({
        ...payload,
        _id
      })
    )
  }
  async getTagList() {
    return await databaseService.tags.find({}).toArray()
  }
  async getTag(id: string) {
    const _id = new ObjectId(id)
    return await databaseService.tags.findOne({ _id })
  }
  async updateTag(id: string, payload: TagDTO) {
    const _id = new ObjectId(id)
    return await databaseService.tags.updateOne(
      { _id },
      {
        $set: _.omit(payload, ['_id', 'updated_at']),
        $currentDate: {
          updated_at: true
        }
      }
    )
  }
  async deleteTag(id: string) {
    const _id = new ObjectId(id)
    await databaseService.tags.deleteOne({ _id })
  }
}

const tagService = new TagService()

export default tagService
