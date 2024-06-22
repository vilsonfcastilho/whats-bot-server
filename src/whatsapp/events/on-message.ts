import { whatsappweb } from '@/infra/services/whatsapp'
import { CreateBet } from '@/whatsapp/use-cases/create-bet-use-case'
import { JoinBet } from '@/whatsapp/use-cases/join-bet-use-case'
import { CloseBet } from '../use-cases/close-bet-use-case'
import { ShowBetResult } from '../use-cases/show-bet-result-use-case'

export function onMessage(): void {
  whatsappweb.client.on('message_create', async (message) => {
    const chat = await message.getChat()

    if (chat.isGroup) {
      const [command, ...args] = message.body.split(' ')

      switch (command) {
        case '!help':
          message.reply(
            `✨ Check all the features:\n\nCommand: !createbet\nDescription: Create a new bet\nExample: !createbet BetTitle option,option,option\n\nCommand: !joinbet\nDescription: Joi a created bet\nExample: !joinbet betId option\n\nCommand: !closebet\nDescription: Stops the people to join a bet\nExample: !closebet betId\n\nCommand: !betresult\nDescription: Close the bet show the winners\nExample: !betresult betId result`,
          )
          break

        case '!createbet':
          // Example command: !createbet BetTitle option1,option2,option3
          const createResponse = await CreateBet.execute({
            groupId: chat.id._serialized,
            authorId: String(message.author),
            title: args[0],
            options: args[1].split(','),
          })
          message.reply(createResponse.message)
          break

        case '!joinbet':
          // Example command: !joinbet betId option
          const joiResponse = await JoinBet.execute({
            betId: args[0],
            userId: String(message.author),
            option: args[1],
          })
          message.reply(joiResponse.message)
          break

        case '!closebet':
          // Example command: !closebet betId
          const closeResponse = await CloseBet.execute({ betId: args[0] })
          message.reply(closeResponse.message)
          break

        case '!betresult':
          // Example command: !betresult betId result
          const betResutResponse = await ShowBetResult.execute({
            betId: args[0],
            result: args[1],
          })
          message.reply(betResutResponse.message)
          break

        // case '!chatgpt':
        //   const prompt = args.join(' ')
        //   const chatgptResponse = await chatgpt.getChatGPTResponse(prompt)
        //   message.reply(chatgptResponse)
        //   break
      }
    }
  })
}
