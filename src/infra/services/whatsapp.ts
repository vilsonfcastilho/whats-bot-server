import { onConnection } from '@/whatsapp/events/on-connection'
import { onMessage } from '@/whatsapp/events/on-message'
import { onQrCode } from '@/whatsapp/events/on-qr-code'
import { Client, LocalAuth } from 'whatsapp-web.js'

class WhatsAppWeb {
  public client: Client

  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      authTimeoutMs: 60 * 1000,
      puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
      webVersionCache: {
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
        type: 'remote',
      },
    })
  }

  async connect() {
    this.client.initialize()

    onQrCode()
    onConnection()
    onMessage()
  }
}

export const whatsappweb = new WhatsAppWeb()
