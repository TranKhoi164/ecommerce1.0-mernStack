import {createClient} from 'redis'
import dotenv from 'dotenv'

dotenv.config()

const {REDIS_URL, REDIS_HOST, REDIS_PORT} = process.env

let redisClient: any

if (!REDIS_URL) {
  redisClient = createClient({
    legacyMode: true,
    socket: {
      port: Number(REDIS_PORT),
      host: String(REDIS_HOST),
    }
  })  
} else {
  redisClient = createClient({
    url: REDIS_URL
  })  
}

redisClient.on('error', (err: any) => console.log('Redis client error: ', err))

redisClient.connect()
redisClient.on('connect', () => console.log('Client connect on ', process.env.REDIS_URL))

export default redisClient