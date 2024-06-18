import { env } from '@/config/env'
import { server } from '@/shared/infra/http/server'
import http from 'http'

const app = http.createServer(server.app)

const port = env().port ?? 3000

app.listen(port, function () {
  console.log(`🚀 Server started on port ${port}!`)
})
