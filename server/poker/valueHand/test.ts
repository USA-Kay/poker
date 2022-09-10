import { Cards, createDeck } from '../createDeck'
import { getCardsFromDeck, numToFaceValue, stringifyHandValues } from '../utils'
import { compareHandValues } from './compareHandValues'
import { valueHand } from './valueHand'

let winLossHash = {
  //[6,5,s]:{chops:2,wins:6,losses:2}
}

const run = () => {
  let deck = createDeck()

  const [community, newDeck] = getCardsFromDeck(deck, 5)
  deck = newDeck

  let hands: Cards[] = new Array(9).map(() => {
    const [hand, newerDeck] = getCardsFromDeck(deck, 2)
    deck = newerDeck
    return hand
  })

  let handsRanked: number[][] = hands.map((hand) =>
    valueHand([...community, ...hand])
  )

  let sortedHands = compareHandValues(...handsRanked)

  let winnersTied = sortedHands.filter((hand) => {
    return (
      JSON.stringify(valueHand([...community, ...sortedHands[0]])) ===
      JSON.stringify(valueHand([...community, ...hand]))
    )
  })

  for (let i = 0; i < sortedHands.length; i++) {
    let suited = sortedHands[i][0][1] === sortedHands[i][1][1] ? 's' : 'o'
    let sortedRanks = [sortedHands[i][0][0], sortedHands[i][1][0]].sort(
      (a, b) => b - a
    )
    let str = JSON.stringify([...sortedRanks, suited])
    if (winnersCount > 1) {
      if (str in winLossHash === false) {
        winLossHash[str] = { chops: 0, wins: 0, losses: 0 }
      }

      if (i === 0) {
        winLossHash[str].wins++
      } else if (winnersCount > 1 && i < winnersCount) {
        winLossHash[str].chops++
      } else {
        winLossHash[str].losses++
      }
    }
  }
}

let i = 0

while (i < 1000000) {
  i++
  run()
}

let entries = Object.entries(winLossHash)

entries = entries
  .map(([key, { chops, wins, losses }]) => {
    let keyArr = JSON.parse(key)

    keyArr[0] = numToFaceValue(keyArr[0])
    keyArr[1] = numToFaceValue(keyArr[1])

    return [
      numToFaceValue(keyArr[0] + numToFaceValue(keyArr[1]) + keyArr[2]),
      {
        chops,
        wins,
        losses,
        winLossRatio: parseFloat((wins / losses).toPrecision(4)),
      },
    ]
  })
  .sort((b, a) => a[1].winLossRatio - b[1].winLossRatio)

console.log(entries)
