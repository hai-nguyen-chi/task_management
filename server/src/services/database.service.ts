import { Collection, Db, MongoClient } from 'mongodb'
import { config } from 'dotenv'
import UserSchema from '@/models/User.schema'
import RefreshTokenSchema from '@/models/RefreshToken.schema'

config()

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@taskmanagement.t6ax4.mongodb.net/?retryWrites=true&w=majority&appName=TaskManagement`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch {
      console.log('Pinged your deployment. You unsuccessfully connected to MongoDB!')
    }
  }

  get users(): Collection<UserSchema> {
    return this.db.collection('users')
  }

  get refreshTokens(): Collection<RefreshTokenSchema> {
    return this.db.collection('refreshTokens')
  }
}

const databaseService = new DatabaseService()
export default databaseService
