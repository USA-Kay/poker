import { shiftArray } from '../utils.js'
import { createDeck } from '../createDeck.js'
import _ from 'lodash'

let runHand = () => {
  shiftPlayerPositions()
  ;({ pot, players } = takeBlinds(BB))

  // DEAL CARDS TO PLAYERS
  ;({ players, deck } = dealCards(players, deck, CARDS_PER_PLAYER))

  runStreets()
}

runHand()
