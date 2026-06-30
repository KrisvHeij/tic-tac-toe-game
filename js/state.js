export function createInitialState() {
  return {
    gameBoard: [null, null, null, null, null, null, null, null, null],
    playerOne: {
      mark: null,
      name: null
    },
    playerTwo: {
      mark: null,
      name: null
    },
    playerTurn: true,
    scorePlayerOne: 0,
    scorePlayerTwo: 0,
    ties: 0
  }
}