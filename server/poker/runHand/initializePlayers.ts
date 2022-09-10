const STARTING_STACK = 200

export const initializePlayers = () => {
  return [
    'Ivey',
    'Negreanu',
    'Hellmuth',
    'Bilzerian',
    'Brunson',
    'Ho',
    'Boeree',
    'Tony G',
    'Gonzales Cannon',
  ].map((name, i) => ({
    chips: STARTING_STACK,
    folded: false,
    holeCards: [],
    name: name,
  }))
}
