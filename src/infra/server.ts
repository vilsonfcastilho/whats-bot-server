import { mongo } from '@/infra/databases/mongodb'
import { whatsappweb } from '@/infra/services/whatsapp'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import 'express-async-errors'
import 'reflect-metadata'

class Server {
  public app: express.Application = express()

  constructor() {
    this.setConfigurations()
    this.setConnections()
  }

  async setConfigurations() {
    this.app.use(express.json())
    this.app.use(cors({ origin: '*' }))
  }

  async setConnections() {
    await mongo.connect()
    await whatsappweb.connect()
  }
}

export const server = new Server()
