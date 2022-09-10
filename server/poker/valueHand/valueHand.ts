import { checkFlush } from './checkFlush'
import { checkStraight } from './checkStraight'
import { mostOfAKind } from './mostOfAKind'
import { Cards } from '../createDeck'

export const handRanks = {
  'ROYAL FLUSH': 9,
  'STRAIGHT FLUSH': 8,
  'FOUR OF A KIND': 7,
  'FULL HOUSE': 6,
  Flush: 5,
  Straight: 4,
  'Three of a Kind': 3,
  'Two Pair': 2,
  Pair: 1,
  'High Card': 0,
}

/**
 *
 * @param cards -> 7 card array
 * @returns an array with the first index indicating the ranking of the hand (0 for high 9 for royal flush)
 * following indexes containing the tie-breaker card
 * for a full two pair of 8 and 3 with King kicker the return would be (2, 8, 13)
 * instead of keeping track of the highest hand rank, we just go through them and return if it hits the rank
 */

// TODO: make sure ace low straight returns 5 as highest kicker
export type Hand = number[]

export const valueHand = (cards: Cards): Hand => {
  let aceIsOne: Cards = cards.map((c) => (c[0] === 14 ? [1, c[1]] : c))

  aceIsOne = aceIsOne.sort((a, b) => {
    return b[0] - a[0]
  })

  let sortedHigh = cards.sort((a, b) => {
    return b[0] - a[0]
  })

  const flush = checkFlush(sortedHigh)
  const straightFlush = flush ? checkStraight(flush) : false

  if (straightFlush) {
    if (straightFlush[0][0] === 14) {
      return [handRanks['ROYAL FLUSH'], 14]
    }
    // STRAIGHT FLUSH
    return [handRanks['STRAIGHT FLUSH'], straightFlush[0][0]]
  }

  const [MOAK, MOAKVal, remainingHand] = mostOfAKind(sortedHigh)

  if (MOAK === 4) {
    return [handRanks['FOUR OF A KIND'], MOAKVal, remainingHand[0][0]]
  }

  const [secondMOAK, secondMOAKVal, secondMOAKRemainingHand] =
    mostOfAKind(remainingHand)

  if (MOAK === 3 && secondMOAK >= 2) {
    return [handRanks['FULL HOUSE'], MOAKVal, secondMOAKVal]
  }

  if (flush) {
    return [handRanks['Flush'], ...flush.slice(0, 5).map((c) => c[0])]
  }

  const straight = checkStraight(sortedHigh)
  const lowStraight = checkStraight(aceIsOne)

  if (straight) {
    return [handRanks['Straight'], ...straight.slice(0, 5).map((c) => c[0])]
  }

  if (lowStraight) {
    return [handRanks['Straight'], ...lowStraight.slice(0, 5).map((c) => c[0])]
  }

  if (MOAK === 3) {
    return [
      handRanks['Three of a Kind'],
      MOAKVal,
      ...remainingHand.slice(0, 2).map((c) => c[0]),
    ]
  }

  if (MOAK === 2) {
    if (secondMOAK === 2) {
      return [
        handRanks['Two Pair'],
        MOAKVal,
        secondMOAKVal,
        secondMOAKRemainingHand[0][0],
      ]
    } else {
      return [
        handRanks['Pair'],
        MOAKVal,
        ...remainingHand.slice(0, 3).map((c) => c[0]),
      ]
    }
  }

  // HIGH CARD
  return [handRanks['High Card'], ...sortedHigh.slice(0, 5).map((c) => c[0])]
}
