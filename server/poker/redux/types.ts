import { Cards } from '../createDeck'

export const POSITIONS = [
  'UTG',
  'UTG+1',
  'UTG+2',
  'LJ',
  'HJ',
  'CO',
  'BTN',
  'SB',
  'BB',
]

export type Player = {
  chips: number
  folded: boolean
  holeCards: Cards
  amountPosted: number // round ends when every player has either posted the same amount or all but one folded
}

export type Players = Player[]

export type GameInfo = {
  pot: number
  community: Cards
  BB: number
  CARDS_PER_PLAYER: number
  position: number
  limit: 'No' | 'Pot' | 'Fixed'
  deck: Cards
  stage: 0 | 1 | 2 | 3 // 'PF' | 'F' | 'T' | 'R'
  betToMatch: number
}
