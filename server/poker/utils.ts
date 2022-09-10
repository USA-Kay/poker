import { random, shuffle } from 'lodash'
import { Card, Cards } from './createDeck'
import { Hand } from './valueHand/valueHand'

export const getCardsFromDeck = (
  deck: Cards,
  amount: number
): [Cards, Cards] => {
  const cards = deck.slice(0, amount)
  const newDeck = deck.slice(amount)

  return [cards, newDeck]
}

export const shiftArray = <T>(array: T[]): T[] => {
  let newArray: T[] = []
  newArray[0] = array[array.length - 1]
  newArray = [...newArray, ...array.slice(0, array.length - 1)]

  return newArray
}

// Used for testing only
export const generateHand = (vals: number[], suited: boolean) => {
  let result: Cards = []

  while (vals.length < 7) {
    vals.push(random(2, 13))
  }

  for (let val of vals) {
    const suit = suited ? '♠' : shuffle(['♥', '♦', '♣', '♠'])[0]
    result.push([val, suit])
  }

  return result
}

export const stringifyCardArr = (cardArr: Card[][]): string[][] => {
  return cardArr.map((cards) => stringifyCards(cards))
}

export const stringifyCards = (cards: Card[]): string[] => {
  return cards.map((card) => stringifyCard(card))
}

export const stringifyCard = (card: Card): string => {
  let first = numToFaceValue(card[0])

  return first + ' ' + card[1]
}

let hands = [
  'ROYAL FLUSH',
  'STRAIGHT FLUSH',
  'QUADS',
  'FULL HOUSE',
  'Flush',
  'Straight',
  'Trips',
  '2 Pair',
  'Pair',
  'High',
].reverse()

export const numToFaceValue = (num: number): string => {
  if (num === 14 || num === 1) {
    return 'A'
  } else if (num === 13) {
    return 'K'
  } else if (num === 12) {
    return 'Q'
  } else if (num === 11) {
    return 'J'
  } else if (num === 10) {
    return 'T'
  } else {
    return num.toString()
  }
}

// returns -> [handRankStr, ...kickers]
export const stringifyHandValues = (handValues: Hand[]): string[] => {
  return handValues.map((handValue) => {
    let result = ''

    result += hands[handValue[0]]

    for (let i = 1; i < handValue.length; i++) {
      result += ` ${numToFaceValue(handValue[i])} Kicker`
    }

    return result
  })
}

export const removeCommunityFromFullHand = (
  fullHand: Cards,
  community: Cards
) => {}
