import { state, setSelectedMark, setPlayerTwoMark, setPlayers, setPlayerTurn, updateGameBoard, updateScore, setTie, setGameBoardForNextRound, createInitialState, resetState } from "./state.js";
// import { isWinner } from "./gameLogic.js";
import { showHideGameBoard, showHideStartMenu, renderGameBoard, gameBoardElements, renderGameTilesHoverState, renderGameTile, toggleTurnOnGameBoardTilesContainer, changeTurnDisplay, renderScore,  showWinnerDialog, resetGameTiles, renderNextRound, closeRestartDialog } from "./render.js";
import { winningCombinations, isWinner, isBoardFull } from "./gameLogic.js";

const startBtnContainer = document.querySelector(".button-container");
const cpuBtn = document.querySelector(".btn-vs-cpu");
const btnRestart = document.getElementById("btnRestart");
const btnNextRound = document.getElementById("btnNextRound");
const btnQuit = document.getElementById("btnQuit");

function startGame(target) {
  console.log(state);
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
  
  // console.log(state);
  renderGameBoard(state);
}

function playTile(button) {
  const tileSvg = button.querySelector(".tile-played");
  const tilePlayed = button.dataset.tile;
  // console.log(tilePlayed)

  updateGameBoard(tilePlayed);
  renderGameTile(state, button, tileSvg);
  // console.log("na renderGameTile:", button.classList);
  if (isWinner(winningCombinations, state.playerTurn)) {
    updateScore(state.playerTurn);
    renderScore(state.playerTurn, state.score)
    showWinnerDialog(state);
    return;
  }

  if (isBoardFull(state)) {
    updateScore(state.ties);
    renderScore(" ", state.ties);
    setTie(state);
    showWinnerDialog(state);
  }
  
  setPlayerTurn();
  // console.log("na setPlayerTurn:", state.playerTurn);
  toggleTurnOnGameBoardTilesContainer(state.playerTurn);
  // console.log("na toggle:", gameBoardTilesContainer.classList);
  renderGameTilesHoverState(state.playerTurn);
  // console.log(state.playerTurn)
  changeTurnDisplay(state.playerTurn);
  
  // console.log(state)
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
  // console.log(state)
}

// Event listeners
startBtnContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn-newgame")) {
    return;
  } else {
    startGame(e.target);
    // console.log(state)
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

btnRestart.addEventListener("click", () => {
  quitGame();
  closeRestartDialog();
})

btnNextRound.addEventListener("click", nextRound);

btnQuit.addEventListener("click", quitGame);

// vs CPU random zetten inplementeren