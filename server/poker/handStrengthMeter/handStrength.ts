import { Cards } from '../createDeck'

// returns 0.16-10 (2-3 and AK)
const highCardEquity = (card: number) => {
  return Math.pow(card, 1.2) / 51.5331
}

// we separate hole and community because strong community cards add strength for everyone and therefore noone
export const handStrength = (hole: Cards) => {
  hole = hole.sort((a, b) => b[0] - a[0])

  const paired = hole[0][0] === hole[1][0]

  if (paired) {
    return Math.pow(hole[0][0], 1.2).toPrecision(4) // 2.3-23.7
  } else {
    let val = highCardEquity(Math.pow(hole[0][0], 1.05) * hole[1][0])
    const suited = hole[0][1] === hole[1][1]

    if (suited) {
      val *= 1.5
    }

    const diff = hole[0][0] - hole[1][0]

    if (diff === 1) {
      val *= 1.32
    } else if (diff === 2) {
      val *= 1.16
    } else if (diff === 3) {
      val *= 1.08
    } else if (diff === 4) {
      val *= 1.04
    }

    return val.toPrecision(5)
  }
}
