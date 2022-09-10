import { compareHandValues, valueHand } from './valueHand'
import _ from 'lodash'
import { generateHand } from '../utils'

describe('values hands correctly', () => {
  const [fhRank, ...fhKickers] = valueHand(generateHand([3, 9, 3, 9, 9, 8, 2]))

  it('full house', () => {
    expect(fhRank).toBe(6)
    expect(fhKickers[0]).toBe(9)
    expect(fhKickers[1]).toBe(3)
    expect(fhKickers.length).toBe(2)
  })

  const [quadRank, ...quadKickers] = valueHand(
    generateHand([2, 2, 6, 2, 9, 2, 13])
  )

  it('quads', () => {
    expect(quadRank).toBe(7)
    expect(quadKickers[0]).toBe(2)
    expect(quadKickers[1]).toBe(13)
  })

  it('values quads over full house', () => {
    const result = compareHandValues(
      [fhRank, ...fhKickers],
      [quadRank, ...quadKickers]
    )

    expect(result[0][1]).toBe(2) // quad 2s wins
  })
})
