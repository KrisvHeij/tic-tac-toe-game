import { state, setSelectedMark, setPlayerTwoMark, setPlayers, setPlayerTurn, updateGameBoard, updateScore, setTie, setGameBoardForNextRound, createInitialState, resetState } from "./state.js";
import { showHideGameBoard, showHideStartMenu, renderGameBoard, gameBoardElements, renderGameTilesHoverState, renderGameTile, renderAllGameTiles, toggleTurnOnGameBoardTilesContainer, changeTurnDisplay, renderScore,  showWinnerDialog, resetGameTiles, renderNextRound } from "./render.js";
import { winningCombinations, isWinner, isBoardFull, randomMoveCpu } from "./gameLogic.js";

const startBtnContainer = document.querySelector(".button-container");
const cpuBtn = document.querySelector(".btn-vs-cpu");
const btnRestart = document.getElementById("btnRestart");
const btnNextRound = document.getElementById("btnNextRound");
const btnQuit = document.getElementById("btnQuit");

function startGame(target) {
  const radioInputs = document.querySelectorAll(".pick-mark-container input[type=radio]");

  for (const radio of radioInputs) {
    if (radio.checked) {
      setSelectedMark(radio.value);
    }
  }
  
  setPlayerTwoMark();
  setPlayers(target);
  changeTurnDisplay(state.playerTurn);
  showHideGameBoard();
  showHideStartMenu();
  renderGameBoard(state);
  cpuMakesMoves();
}

function checkForWinner(state) {
  if (isWinner(winningCombinations, state.gameBoard, state.playerTurn)) {
    updateScore(state.playerTurn);
    renderScore(state.playerTurn, state.score)
    showWinnerDialog(state);
    return true;
  }
  if (isBoardFull(state)) {
    updateScore(state.ties);
    renderScore(" ", state.ties);
    setTie(state);
    showWinnerDialog(state);
    return true;
  }
}

function cpuMakesMoves() {
  if (state.playerTurn === state.playerTwo.mark && state.playerTwo.name === "cpu") {
    randomMoveCpu(state.gameBoard, state.playerTurn);
    setTimeout(() => {
      renderAllGameTiles(state.gameBoard, state.playerTurn);
      if (checkForWinner(state)) return;
      setPlayerTurn();
      toggleTurnOnGameBoardTilesContainer();
      renderGameTilesHoverState(state.playerTurn);
      changeTurnDisplay(state.playerTurn);
      console.log("timeout")
    }, 250); 
  }
}

function playTile(button) {
  const tileSvg = button.querySelector(".tile-played");
  const tilePlayed = button.dataset.tile;

  updateGameBoard(tilePlayed);
  renderGameTile(state, button, tileSvg);
  if (checkForWinner(state)) return;
  setPlayerTurn();
  toggleTurnOnGameBoardTilesContainer();
  renderGameTilesHoverState(state.playerTurn);
  changeTurnDisplay(state.playerTurn);
  cpuMakesMoves();
}

function nextRound() {
  setGameBoardForNextRound();
  setPlayerTurn();
  renderNextRound(state);
}

function quitGame() {
  resetState();
  resetGameTiles();
  showHideGameBoard();
  showHideStartMenu();
}

// Event listeners
startBtnContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn-newgame")) {
    return;
  } else {
    startGame(e.target);
  }
});

gameBoardElements[0].addEventListener("click", (e) => {
  const button = e.target.closest(".tile");
  if (!button) {
    return;
  } else {
    playTile(button);
  }
})

btnNextRound.addEventListener("click", () => {
  nextRound();
  cpuMakesMoves();
});

btnRestart.addEventListener("click", quitGame);
btnQuit.addEventListener("click", quitGame);