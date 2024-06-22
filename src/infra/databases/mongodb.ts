import { env } from '@/config/env'
import mongoose from 'mongoose'

class Mongo {
  async connect() {
    await mongoose
      .connect(env().database_url, {
        dbName: 'whats-bet',
      })
      .then(() => {
        console.log('⚡ MongoDB is connected!')
      })
  }
}

export const mongo = new Mongo()
