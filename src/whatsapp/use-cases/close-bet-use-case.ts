import { Bet } from '@/models/bet.model'
import { Types } from 'mongoose'
import WAWebJS from 'whatsapp-web.js'

interface IRequest {
  message: WAWebJS.Message
  betId: string
}

class CloseBetUseCase {
  async execute({ message, betId }: IRequest): Promise<WAWebJS.Message> {
    if (!betId || betId === '') return message.reply('❌ Parameter "betId" is required.')

    const bet = await Bet.findById(new Types.ObjectId(betId))
    if (!bet) return message.reply('❌ Bet not found.')

    bet.is_open = false
    bet.updated_at = new Date()
    await bet.save()

    return message.reply(`⛔ Bet is close!\nThis bet is no longer accepting guesses!\n\nBet title: ${bet.title}`)
  }
}

export const CloseBet = new CloseBetUseCase()
