import { Bet, IBet, IBetParticipant } from '@/models/bet.model'
import { Types } from 'mongoose'

interface IRequest {
  betId: string
  result: string
}

interface IResponse {
  message: string
  data: IBet | null
}

class ShowBetResultUseCase {
  async execute({ betId, result }: IRequest): Promise<IResponse> {
    if (!betId || betId === '') throw new Error('Parameter "betId" is required.')
    if (!result || result === '') throw new Error('Parameter "result" is required.')

    const bet = await Bet.findById(new Types.ObjectId(betId))
    if (!bet) throw new Error('Bet not found.')
    if (!bet.options.includes(result)) throw new Error('Result should match with the bet options.')

    const winners = bet.participants.filter((participant) => participant.option === result)
    const winnersIds = winners.reduce((acc: string[], cur: IBetParticipant) => {
      acc.push(`@${cur.user_id}`)
      return acc
    }, [])

    bet.winners = winners
    bet.result = result
    bet.updated_at = new Date()
    await bet.save()

    return {
      message: `🔥 Bet is over!!!\n\nBet title: ${bet.title}\n\nWinner(s): ${winnersIds.toString().replace(/,/g, ', ')}`,
      data: bet,
    }
  }
}

export const ShowBetResult = new ShowBetResultUseCase()
