import {createClient} from 'redis'
import dotenv from 'dotenv'

dotenv.config()

const redisClient = createClient({url: process.env.REDIS_URL})

redisClient.on('error', (err) => console.log('Redis client error: ', err))

redisClient.connect()
redisClient.on('connect', () => console.log('Client connect on ', process.env.REDIS_URL))

export default redisClient