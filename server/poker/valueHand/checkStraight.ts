import { Cards } from '../createDeck'

const removeDuplicates = (hand: Cards): Cards => {
  const ranksOnly = hand.map((c) => c[0])
  const withoutDuplicates = hand.filter(([rank], i) => {
    if (ranksOnly.indexOf(rank) !== i) {
      return false
    }
    return true
  })

  return withoutDuplicates
}

// takes a 5 card hand with no duplicates
const isStraight = (fiveConseq: Cards): Cards | false => {
  for (let i = 0; i < 4; i++) {
    if (fiveConseq[i][0] !== fiveConseq[i + 1][0] + 1) {
      return false
    }
  }

  return fiveConseq
}

// takes a 5-7 length hand sorted descended with either aces as 1 or 14
export const checkStraight = (rawHand: Cards): Cards | false => {
  // A hand like 10 9 9 8 7 6 2 will not seem like a straight because of the 9
  const hand = removeDuplicates(rawHand)

  if (hand.length < 5) {
    return false
  }

  // start at the beginning where the straights will be the highest
  for (let i = 0; i <= hand.length - 5; i++) {
    const val = isStraight(hand.slice(i, i + 5))

    if (val) {
      return val
    }
  }

  return false
}
