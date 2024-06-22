export interface IEnvironment {
  port: number
  database_url: string
  openai_api_key: string
}

export function env(): IEnvironment {
  return {
    port: Number(process.env.PORT),
    database_url: String(process.env.DATABASE_URL),
    openai_api_key: String(process.env.OPENAI_API_KEY),
  }
}
