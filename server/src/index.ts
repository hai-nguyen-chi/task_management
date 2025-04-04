import express from 'express'
import databaseService from '@/services/database.service'
import authRoute from '@/routes/auth.route'
import { errorHandlerDefault } from '@/utils/errorHandler'
const app = express()
const port = 4000

databaseService.connect()
app.use(express.json())
app.use('/auth', authRoute)
app.use(errorHandlerDefault)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
