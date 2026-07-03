const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const winCombinations = [[0, 1, 2], [3, 4, 5]];

const gameBoard = ["x", "o", "x", "o", "o", "o", "x", null, null];

export function isWinner(arr, playerTurn) {
  return arr.some((arrVal) => {
    // console.log(arr, arrVal, playerTurn)
    return arrVal.every((innerVal) => {
      return gameBoard[innerVal] === playerTurn;
    })
  })
}

console.log(isWinner(winCombinations, "o"))