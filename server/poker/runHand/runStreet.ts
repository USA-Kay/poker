import { getPlayerAction } from '../AI/getPlayerAction'
import { getCardsFromDeck } from '../utils'

// TODO: let small blind call for half price

// if its preflop we know players can't check
const runStreet = (players, isPreflop) => {
  for (let playerName in players) {
    if (players[playerName].folded) {
      continue
    }

    let amountToCall = isPreflop ? BB : 0

    const action = getPlayerAction(players[playerName], amountToCall)

    if (action === 'CALL') {
    } else if (action === 'FOLD') {
      if (amountToCall === 0) {
        // CHECK
      } else {
        // FOLD
      }
    } else {
      // raise, action is a number
    }
  }
}
