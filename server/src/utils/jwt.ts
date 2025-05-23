import { config } from 'dotenv'
import jwt, { SignOptions } from 'jsonwebtoken'
import { TokenType, UserProjectRole } from '@/types/user'
config()

interface Payload {
  user_id: string
  permissions?: string[]
  projects?: UserProjectRole[]
  token_type: TokenType
}

const signToken = ({
  payload,
  privateKey,
  options = { algorithm: 'HS256' }
}: {
  payload: Payload
  privateKey: string
  options?: SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, function (err, token) {
      if (err) {
        throw reject(err)
      }
      resolve(token as string)
    })
  })
}

const verifyToken = ({ token, secretOrPublicKey }: { token: string; secretOrPublicKey: string }) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, function (err, decoded) {
      if (err) {
        throw reject(err)
      }
      resolve(decoded)
    })
  })
}

export { signToken, verifyToken }
