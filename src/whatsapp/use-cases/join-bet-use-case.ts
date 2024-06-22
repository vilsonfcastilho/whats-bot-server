import { Bet, IBet } from '@/models/bet.model'
import { Types } from 'mongoose'

interface IRequest {
  betId: string
  userId: string
  option: string
}

interface IResponse {
  message: string
  data: IBet | null
}

class JoinBetUseCase {
  async execute({ betId, userId, option }: IRequest): Promise<IResponse> {
    if (!betId || betId === '') throw new Error('Parameter "betId" is required.')
    if (!userId || userId === '') throw new Error('Parameter "userId" is required.')
    if (!option || option === '') throw new Error('Parameter "option" is required.')

    const bet = await Bet.findById(new Types.ObjectId(betId))
    if (!bet) throw new Error('Bet not found.')
    if (!bet.options.includes(option)) throw new Error('Option not valid.')

    bet.participants.push({ user_id: userId, option })
    bet.updated_at = new Date()
    await bet.save()

    return {
      message: `✅ You have joined a bet!\n\nBet title: ${bet.title}\nYou guess: ${option}`,
      data: bet,
    }
  }
}

export const JoinBet = new JoinBetUseCase()
