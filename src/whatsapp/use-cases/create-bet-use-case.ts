import { Bet, IBet } from '@/models/bet.model'

interface IRequest {
  groupId: string
  authorId: string
  title: string
  options: string[]
}

interface IResponse {
  message: string
  data: IBet
}

class CreateBetUseCase {
  async execute({ groupId, authorId, title, options }: IRequest): Promise<IResponse> {
    if (!groupId || groupId === '') throw new Error('Parameter "groupId" is required.')
    if (!authorId || authorId === '') throw new Error('Parameter "authorId" is required.')
    if (!title || title === '') throw new Error('Parameter "title" is required.')
    if (!options) throw new Error('Parameter "options" is required.')

    const bet = await Bet.create({
      group_id: groupId,
      author_id: authorId,
      title,
      options,
    })

    return {
      message: `📢 New bet!!!\n\nID: ${bet._id}\nTitle: ${bet.title}\nOptions: ${bet.options.toString().replace(/,/g, ' | ')}`,
      data: bet,
    }
  }
}

export const CreateBet = new CreateBetUseCase()
