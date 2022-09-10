import { addToPot } from './game'
import { takeChipsFromPlayer } from './playerSlice'
import { store } from './store'

export const takeBlinds = () => {
  const { game, players } = store.getState()
  const { BB } = game

  takeChipsFromPlayer({ index: players.length - 1, amount: BB })
  takeChipsFromPlayer({ index: players.length - 2, amount: BB / 2 })
  addToPot(BB * 1.5)
}
