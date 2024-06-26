import { Bet, IBetParticipant } from '@/models/bet.model'
import { Types } from 'mongoose'
import WAWebJS from 'whatsapp-web.js'

interface IRequest {
  message: WAWebJS.Message
  betId: string
  result: string
}

class ShowBetResultUseCase {
  async execute({ message, betId, result }: IRequest): Promise<WAWebJS.Message> {
    if (!betId || betId === '') return message.reply('❌ Parameter "betId" is required.')
    if (!result || result === '') return message.reply('❌ Parameter "result" is required.')

    const bet = await Bet.findById(new Types.ObjectId(betId))
    if (!bet) return message.reply('❌ Bet not found.')
    if (!bet.options.includes(result)) return message.reply('❌ Result should match with the bet options.')

    const winners = bet.participants.filter((participant) => participant.option === result)
    const winnersIds = winners.reduce((acc: string[], cur: IBetParticipant) => {
      acc.push(`@${cur.user_id}`)
      return acc
    }, [])

    bet.winners = winners
    bet.result = result
    bet.updated_at = new Date()
    await bet.save()

    return message.reply(
      `🔥 Bet is over!!!\n\nBet title: ${bet.title}\n\nWinner(s): ${winnersIds.toString().replace(/,/g, ', ')}`,
    )
  }
}

export const ShowBetResult = new ShowBetResultUseCase()
