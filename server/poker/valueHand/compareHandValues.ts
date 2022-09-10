import { Cards } from '../createDeck'
import { Hand } from './valueHand'

export const compareHandValues = (...hands: Hand[]): Hand[] => {
  return hands.sort((a, b) => {
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      const aVal = a[i] || 0
      const bVal = b[i] || 0

      if (aVal > bVal) {
        return -1
      } else if (aVal < bVal) {
        return 1
      }
    }
    return 0
  })
}
