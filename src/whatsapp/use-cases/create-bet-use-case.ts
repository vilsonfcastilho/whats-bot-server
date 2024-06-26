import { Bet } from '@/models/bet.model'
import WAWebJS from 'whatsapp-web.js'

interface IRequest {
  message: WAWebJS.Message
  groupId: string
  authorId: string
  title: string
  options: string[]
}

class CreateBetUseCase {
  async execute({ message, groupId, authorId, title, options }: IRequest): Promise<WAWebJS.Message> {
    if (!groupId || groupId === '') return message.reply('❌ Parameter "groupId" is required.')
    if (!authorId || authorId === '') return message.reply('❌ Parameter "authorId" is required.')
    if (!title || title === '') return message.reply('❌ Parameter "title" is required.')
    if (!options) return message.reply('❌ Parameter "options" is required.')

    const bet = await Bet.create({
      group_id: groupId,
      author_id: authorId,
      title,
      options,
    })

    return message.reply(
      `📢 New bet!!!\n\nID: ${bet._id}\nTitle: ${bet.title}\nOptions: ${bet.options.toString().replace(/,/g, ' | ')}`,
    )
  }
}

export const CreateBet = new CreateBetUseCase()
