import { shuffle } from 'lodash'

const nums = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
const suits = ['♥', '♦', '♣', '♠']

export type Card = [number, string]
export type Cards = Card[]

export const createDeck = (shuffleDeck: boolean = true) => {
  let deck: Cards = []

  for (let num of nums) {
    for (let suit of suits) {
      deck.push([num, suit])
    }
  }
  if (shuffleDeck) {
    deck = shuffle(deck)
  }
  return deck
}
