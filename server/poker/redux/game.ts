import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { GameInfo } from './types'
import { createDeck } from '../createDeck'
import { getCardsFromDeck } from '../utils'

const initialState: GameInfo = {
  pot: 0,
  community: [],
  BB: 2,
  CARDS_PER_PLAYER: 2,
  position: 0,
  limit: 'No',
  deck: createDeck(),
  stage: 0,
  betToMatch: 0,
}

export const gameSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    addToPot: (state, action: PayloadAction<number>) => {
      state.pot += action.payload
    },
    resetGame: (state, action: PayloadAction<{ playerCount: number }>) => {
      let newPosition = state.position + 1

      return {
        ...state,
        community: [],
        pot: 0,
        deck: createDeck(),
        position: newPosition,
        betToMatch: 0,
      }
    },
    dealCards: (state) => {
      const count = state.stage === 0 ? 3 : 1

      const [cards, newDeck] = getCardsFromDeck(state.deck, count)

      state.community.push(...cards)
      state.deck = newDeck
      state.stage += 1
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPot, resetGame, dealCards } = gameSlice.actions
