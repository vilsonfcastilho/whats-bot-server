import { env } from '@/config/env'
import mongoose from 'mongoose'

class Mongo {
  async connect() {
    await mongoose
      .connect(env().database_url, {
        dbName: 'carbon_monitoring',
      })
      .then(() => {
        console.log('⚡ MongoDB is connected!')
      })
  }
}

export const mongo = new Mongo()
