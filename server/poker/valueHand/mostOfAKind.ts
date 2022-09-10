import { Cards } from '../createDeck'

// returns -> [count, rank, remainingHand]
export const mostOfAKind = (hand: Cards): [number, number, Cards] => {
  let hash: { [rank: number]: number } = {}

  for (let card of hand) {
    if (card[0] in hash) {
      hash[card[0]]++
    } else {
      hash[card[0]] = 1
    }
  }

  let ranks = Object.keys(hash)

  let mostOfAKindRank: number = parseInt(
    ranks.reduce((accum, cur) => {
      if (hash[cur] === hash[accum] && cur > accum) {
        return cur
      } else if (hash[cur] > hash[accum]) {
        return cur
      } else {
        return accum
      }
    }, ranks[0])
  )

  let handWithout = hand
    .filter((card) => card[0] !== mostOfAKindRank)
    .sort((a, b) => {
      return b[0] - a[0]
    })

  return [hash[mostOfAKindRank], mostOfAKindRank, handWithout]
}
