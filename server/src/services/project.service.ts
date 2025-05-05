import { config } from 'dotenv'
import { ProjectDTO, ProjectMemberRole } from '@/types/project'
import databaseService from '@/services/database.service'
import ProjectSchema from '@/models/Project.schema'
import { ObjectId } from 'mongodb'
import _ from 'lodash'

config()

class ProjectService {
  async createProject(payload: ProjectDTO) {
    const _id = new ObjectId()
    const project = await databaseService.projects.insertOne(
      new ProjectSchema({
        ...payload,
        task_status: payload.task_status || [],
        members: payload.members || [],
        _id
      })
    )
    if (payload.members) {
      const members = payload.members.map(async (member: ProjectMemberRole) => {
        const user_id = new ObjectId(member.member_id)
        return await databaseService.users.updateOne(
          { _id: user_id },
          {
            $push: {
              projects: {
                project_id: _id,
                isAdmin: member.isAdmin
              }
            },
            $currentDate: {
              updated_at: true
            }
          }
        )
      })
      await Promise.all(members)
    }
    return project
  }
  async getProjectList() {
    return await databaseService.projects.find({}).toArray()
  }
  async getProject(id: string) {
    const _id = new ObjectId(id)
    return await databaseService.projects.findOne({ _id })
  }
  async updateProject(id: string, payload: ProjectDTO) {
    const _id = new ObjectId(id)
    return await databaseService.projects.updateOne(
      { _id },
      {
        $set: _.omit(payload, ['_id', 'updated_at']),
        $currentDate: {
          updated_at: true
        }
      }
    )
  }
  async deleteProject(id: string) {
    const _id = new ObjectId(id)
    await databaseService.projects.deleteOne({ _id })
  }
}

const projectService = new ProjectService()

export default projectService
