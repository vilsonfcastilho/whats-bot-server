import { whatsappweb } from '@/infra/services/whatsapp'

export function onConnection(): void {
  whatsappweb.client.on('ready', () => {
    console.log('📱 WhatsApp Client is connected!')
  })
}
