import { model, Schema, Types } from 'mongoose'

export type IBetParticipant = {
  user_id: string
  option: string
}

export type IBet = {
  _id: Types.ObjectId
  group_id: string
  author_id: string
  title: string
  options: string[]
  participants: IBetParticipant[]
  winners: IBetParticipant[]
  is_open: boolean
  result: string
  created_at: Date
  updated_at: Date
}

const BetSchema = new Schema<IBet>({
  group_id: { type: String, required: true },
  author_id: { type: String, required: true },
  title: { type: String, required: true },
  options: [{ type: String, required: true }],
  participants: [
    {
      _id: false,
      user_id: { type: String, required: true },
      option: { type: String, required: true },
    },
  ],
  winners: [
    {
      _id: false,
      user_id: { type: String, required: true },
      option: { type: String, required: true },
    },
  ],
  result: { type: String, required: false, default: null },
  is_open: { type: Boolean, required: true, default: true },
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
})

export const Bet = model('bets', BetSchema)
