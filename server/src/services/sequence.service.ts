import databaseService from '@/services/database.service'

const getNextSequence = async (type: string): Promise<number> => {
  const result = await databaseService.sequences.findOneAndUpdate(
    { _id: type },
    { $inc: { sequence_value: 1 } },
    { returnDocument: 'after', upsert: true }
  )
  if (!result) {
    return 0
  }
  return result.sequence_value
}

export { getNextSequence }
