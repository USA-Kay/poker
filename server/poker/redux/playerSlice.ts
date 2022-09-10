import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Players } from './types'
import { Cards } from '../createDeck'

const initialState: Players = []

export const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    addPlayersToGame: (state, action: PayloadAction<Players>) => {
      state.push(...action.payload)
    },
    removePlayerFromGame: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1)
    },
    takeChipsFromPlayer: (
      state,
      { payload }: PayloadAction<{ index: number; amount: number }>
    ) => {
      state[payload.index].chips -= payload.amount
    },
    resetPlayerStates: (state) => {
      return state.map((player) => ({
        ...player,
        folded: false,
        holeCards: [],
      }))
    },
    foldPlayer: (state, action: PayloadAction<number>) => {
      state[action.payload].folded = true
    },
    dealHoleCards: (state, action: PayloadAction<Cards>) => {
      for (let player of state) {
        player.holeCards = action.payload.splice(0, 2)
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  addPlayersToGame,
  removePlayerFromGame,
  takeChipsFromPlayer,
  resetPlayerStates,
  foldPlayer,
  dealHoleCards,
} = playerSlice.actions
