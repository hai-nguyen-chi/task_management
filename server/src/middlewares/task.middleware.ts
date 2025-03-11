import { config } from 'dotenv'
import { validate } from '@/utils/validateHandler'
import { checkSchema } from 'express-validator'

config()

const taskSchemaValidator = validate(
  checkSchema({
    title: {
      notEmpty: {
        errorMessage: 'Tiêu đề là bắt buộc'
      },
      isString: {
        errorMessage: 'Tiêu đề phải là chuỗi'
      },
      trim: true
    },
    status: {
      isIn: {
        options: [['Backlog', 'ToDo', 'InProgress', 'InReview', 'Completed']],
        errorMessage: 'Trạng thái không hợp lệ'
      }
    }
  })
)

export { taskSchemaValidator }
