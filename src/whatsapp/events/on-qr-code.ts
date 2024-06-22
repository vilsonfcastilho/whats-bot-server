import { whatsappweb } from '@/infra/services/whatsapp'
import qrcode from 'qrcode-terminal'

export function onQrCode(): void {
  whatsappweb.client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
  })
}
