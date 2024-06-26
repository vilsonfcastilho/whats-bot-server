import { Bet } from '@/models/bet.model'
import { Types } from 'mongoose'
import WAWebJS from 'whatsapp-web.js'

interface IRequest {
  message: WAWebJS.Message
  betId: string
  userId: string
  option: string
}

class JoinBetUseCase {
  async execute({ message, betId, userId, option }: IRequest): Promise<WAWebJS.Message> {
    if (!betId || betId === '') return message.reply('❌ Parameter "betId" is required.')
    if (!userId || userId === '') return message.reply('❌ Parameter "userId" is required.')
    if (!option || option === '') return message.reply('❌ Parameter "option" is required.')

    const bet = await Bet.findById(new Types.ObjectId(betId))
    if (!bet) return message.reply('❌ Bet not found.')
    if (!bet.options.includes(option)) return message.reply('❌ Option not valid.')

    bet.participants.push({ user_id: userId, option })
    bet.updated_at = new Date()
    await bet.save()

    return message.reply(`✅ You have joined a bet!\n\nBet title: ${bet.title}\nYou guess: ${option}`)
  }
}

export const JoinBet = new JoinBetUseCase()
