import { state } from "./state.js";

export const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

export function isWinner(arr, playerTurn) {
  // console.log("gameBoard:", state.gameBoard);
  // console.log("playerTurn:", playerTurn);
  return arr.some((arrVal) => {
    // console.log(arr, arrVal, playerTurn)
    return arrVal.every((innerVal) => {
      return state.gameBoard[innerVal] === playerTurn;
    })
  })
}

export function isBoardFull(state) {
  return state.gameBoard.every(tile => tile !== null)
}

export function randomMoveCpu(gameBoard, playerTurn) {
  const emptyTiles = gameBoard.map((_, i) => i).filter(i => gameBoard[i] === null);
  const randomNum = Math.floor((Math.random() * emptyTiles.length));
  const selectedTile = emptyTiles[randomNum];
  gameBoard[selectedTile] = playerTurn;
}