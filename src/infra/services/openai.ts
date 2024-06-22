import { env } from '@/config/env'
import OpenAI from 'openai'

class ChatGPT {
  public openai: OpenAI

  constructor() {
    this.openai = new OpenAI({
      apiKey: env().openai_api_key,
    })
  }

  async getChatGPTResponse(prompt: string) {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 1,
        max_tokens: 4096,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })

      return response.choices[0].message.content || 'No response from ChatGPT.'
    } catch (error: any) {
      if (error.response && error.response.status === 429) {
        return 'You have exceeded the API quota. Please try again later.'
      }
      return 'An error occurred while fetching the response from ChatGPT.'
    }
  }
}

export const chatgpt = new ChatGPT()
