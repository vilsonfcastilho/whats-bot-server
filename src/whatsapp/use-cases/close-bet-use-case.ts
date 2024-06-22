import { Bet, IBet } from '@/models/bet.model'
import { Types } from 'mongoose'

interface IRequest {
  betId: string
}

interface IResponse {
  message: string
  data: IBet | null
}

class CloseBetUseCase {
  async execute({ betId }: IRequest): Promise<IResponse> {
    if (!betId || betId === '') throw new Error('Parameter "betId" is required.')

    const bet = await Bet.findById(new Types.ObjectId(betId))
    if (!bet) throw new Error('Bet not found.')

    bet.is_open = false
    bet.updated_at = new Date()
    await bet.save()

    return {
      message: `⛔ Bet is close!\nThis bet is no longer accepting guesses!\n\nBet title: ${bet.title}`,
      data: bet,
    }
  }
}

export const CloseBet = new CloseBetUseCase()
