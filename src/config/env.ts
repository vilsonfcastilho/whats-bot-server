export interface IEnvironment {
  port: number
  database_url: string
}

export function env(): IEnvironment {
  return {
    port: Number(process.env.PORT),
    database_url: String(process.env.DATABASE_URL),
  }
}
