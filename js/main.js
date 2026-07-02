import { state, setSelectedMark, setPlayerTwoMark, setPlayers, setPlayerTurn } from "./state.js";
import { showHideGameBoard, showHideStartMenu, renderGameBoard } from "./render.js";
import { gameBoardElements } from "./render.js";

const startBtnContainer = document.querySelector(".button-container");
const cpuBtn = document.querySelector(".btn-vs-cpu");

function startGame(target) {
  const radioInputs = document.querySelectorAll(".pick-mark-container input[type=radio]");

  for (const radio of radioInputs) {
    if (radio.checked) {
      setSelectedMark(radio.value);
    }
  }
  
  setPlayerTwoMark();
  setPlayers(target);
  showHideGameBoard();
  showHideStartMenu();
  
  console.log(state);
  renderGameBoard(state);
}

function playTile(tile) {
  const tileMark = tile.document.querySelector(".tile-played");

  showPlayedTile()
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

console.log(state);