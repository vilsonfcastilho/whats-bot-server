import { mongo } from '@/shared/infra/databases/mongo-db'
import { globalExceptionHandler } from '@/shared/infra/http/middlewares/global-exception-handler'
import { router } from '@/shared/infra/http/routes'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import 'express-async-errors'
import 'reflect-metadata'

class Server {
  public app: express.Application = express()

  constructor() {
    this.setConfigurations()
    this.setRoutes()
    this.setErrorHandlers()
    this.setConnections()
  }

  async start() {
    await this.setConnections()
  }

  async setConfigurations() {
    this.app.use(express.json())
    this.app.use(cors({ origin: '*' }))
  }

  async setRoutes() {
    this.app.use('/api', router)
  }

  async setErrorHandlers() {
    this.app.use(globalExceptionHandler)
  }

  async setConnections() {
    await mongo.connect()
  }
}

export const server = new Server()
