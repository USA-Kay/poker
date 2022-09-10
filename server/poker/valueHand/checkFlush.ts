// takes a 5-7 card hand with aces as 14
// in 7 card poker you can only have a flush of one suit since you need 3 community cards of that suit

import { Cards } from '../createDeck'

// returns false or a 5-7 length flush sorted descending
export const checkFlush = (hand: Cards): Cards | false => {
  let hash: { [suit: string]: Cards } = {}

  for (let [rank, suit] of hand) {
    if (suit in hash) {
      hash[suit].push([rank, suit])
    } else {
      hash[suit] = [[rank, suit]]
    }
  }

  for (let key in hash) {
    if (hash[key].length >= 5) {
      return hash[key]
    }
  }

  return false
}
