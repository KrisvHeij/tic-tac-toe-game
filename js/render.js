const scoreElementX = document.getElementById("scoreX");
const scoreElementO = document.getElementById("scoreO");
const scoreElementTies = document.getElementById("scoreTies");
const scoreTextX = document.getElementById("scoreTextX");
const scoreTextO = document.getElementById("scoreTextO");
const gameBoardTilesContainer = document.querySelector(".game-board-tiles");
const turnDisplaySvg = document.querySelector(".turn-display-svg");
const gameTiles = document.querySelectorAll(".tile");
const gameTilesHover = document.querySelectorAll(".tile-hover");
const winnerDialog = document.getElementById("next-round-dialog");
const winnerText = document.querySelector("#winner-text h3");
const winnerRound = document.getElementById("winner-icon-text");

const svgs = {
  x: `<svg viewbox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/></svg>`,
  xSlate300: `<svg viewbox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#a7bec8" fill-rule="evenodd"/></svg>`,
  o: `<svg viewbox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/></svg>`,
  oSlate300: `<svg viewbox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#a7bec8"/></svg>`,
  outlineX: `<svg viewbox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M51.12 1.269c.511 0 1.023.195 1.414.586l9.611 9.611c.391.391.586.903.586 1.415s-.195 1.023-.586 1.414L44.441 32l17.704 17.705c.391.39.586.902.586 1.414 0 .512-.195 1.024-.586 1.415l-9.611 9.611c-.391.391-.903.586-1.415.586a1.994 1.994 0 0 1-1.414-.586L32 44.441 14.295 62.145c-.39.391-.902.586-1.414.586a1.994 1.994 0 0 1-1.415-.586l-9.611-9.611a1.994 1.994 0 0 1-.586-1.415c0-.512.195-1.023.586-1.414L19.559 32 1.855 14.295a1.994 1.994 0 0 1-.586-1.414c0-.512.195-1.024.586-1.415l9.611-9.611c.391-.391.903-.586 1.415-.586s1.023.195 1.414.586L32 19.559 49.705 1.855c.39-.391.902-.586 1.414-.586Z" stroke="#31C3BD" stroke-width="2" fill="none"/></svg>`,
  outlineO: `<svg viewbox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><path d="M33 1c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C15.327 65 1 50.673 1 33 1 15.327 15.327 1 33 1Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" stroke="#F2B137" stroke-width="2" fill="none"/></svg>`
};

export const gameBoardElements = [gameBoardTilesContainer];

export function showHideStartMenu() {
  const startMenu = document.getElementById("startMenu");

  startMenu.classList.toggle("hidden");
}

export function showHideGameBoard() {
  const gameBoard = document.getElementById("gameBoard");

  gameBoard.classList.toggle("hidden");
}

export function toggleTurnOnGameBoardTilesContainer(turn) {
  let playerTurn = turn === "x" ? "turn-x" : "turn-o";
  // console.log(turn)
  gameBoardTilesContainer.classList.toggle("turn-x");
  gameBoardTilesContainer.classList.toggle("turn-o");

  // if (turn === "x") {
  //   gameBoardTilesContainer.classList.remove(playerTurn);
  //   gameBoardTilesContainer.classList.add("turn-o");
  // }
  // if (turn === "o") {
  //   gameBoardTilesContainer.classList.remove(playerTurn);
  //   gameBoardTilesContainer.classList.add("turn-x");
  // }
}

export function renderGameTilesHoverState(turn) {
  let playerTurn = turn === "x" ? "turn-x" : "turn-o";
  // gameBoardTilesContainer.classList.add(playerTurn);

  gameTilesHover.forEach((tile) => {
    tile.innerHTML = playerTurn === "turn-x" ? `${svgs.outlineX}` : `${svgs.outlineO}`;
  })
}

export function renderGameBoard(state) {
  scoreElementX.textContent = state.score.x;
  scoreElementO.textContent = state.score.o;
  scoreElementTies.textContent = state.ties;
  // Kan de code hieronder korter/anders?
  scoreTextX.textContent = state.playerOne.mark === "x" ? state.playerOne.name : state.playerTwo.name;
  scoreTextO.textContent = state.playerTwo.mark ==="o" ? state.playerTwo.name : state.playerOne.name;

  renderGameTilesHoverState(state.playerTurn);
}

export function renderGameTile(state, tile, svg) {
  tile.classList.add(`tile-${state.playerTurn}`);
  svg.innerHTML = `${svgs[state.playerTurn]}`;
  tile.disabled = true;
}

export function renderAllGameTiles(gameBoard, playerTurn) {
  gameBoard.forEach((mark, index) => {
    // const tileSvg = gameTiles.querySelectorAll(".tile-played");
    if (mark !== null) {
      gameTiles[index].classList.add(`tile-${mark}`);
      gameTiles[index].querySelector(".tile-played").innerHTML = `${svgs[mark]}`;
      gameTiles[index].disabled = true;
    }
    
    
  })
}

export function changeTurnDisplay(turn) {
  turnDisplaySvg.innerHTML = turn === "x" ? `${svgs.xSlate300}` : `${svgs.oSlate300}`;
}

export function renderScore(winner = null, score) {
  if (winner === "x" || winner === "o") {
    const scoreElement = winner === "x" ? document.getElementById(`score${winner.toUpperCase()}`) : document.getElementById(`score${winner.toUpperCase()}`);
  scoreElement.textContent = score[winner];
  } else {
    scoreElementTies.textContent = score;
  }
}

function renderWinnerText(winner = null, playerOne = null, playerTwo = null) {
  if (playerOne.name === "cpu" || playerTwo.name === "cpu") {
    winnerText.textContent = winner === playerOne.mark ? "you won!" : "oh no, you lost...";
  } else if (playerOne.name === "p2" || playerTwo.name === "p2") {
    winnerText.textContent = winner === playerOne.mark ? `${playerOne.name} wins!` : `${playerTwo.name} wins!`;
  } else {
    winnerText.textContent = "";
  }
}

function renderNextRoundText(winner, playerOne = null, playerTwo = null) {
  // renderWinnerText(winner, playerOne, playerTwo);
  if (winner === "x" || winner === "o") {
    winnerRound.classList = winner === playerOne.mark ? `--winner-${winner}` : `--winner-${playerTwo.mark}`;
    winnerRound.innerHTML = winner === playerOne.mark ? `${svgs[playerOne.mark]} takes the round` : `${svgs[playerTwo.mark]} takes the round`;
  } else {
    winnerRound.classList = "--tied";
    winnerRound.textContent = "Round Tied";
  }
  // console.log(winner)
}

export function showWinnerDialog(state) {
  console.log(state)
  const winner = state.playerTurn;

  if (winner === "x" || winner === "o") {
    renderWinnerText(winner, state.playerOne, state.playerTwo);
    renderNextRoundText(winner, state.playerOne, state.playerTwo);
    winnerDialog.show();
    return;
  } else {
    renderWinnerText("", "", "");
    renderNextRoundText(winner, "", "");
    winnerDialog.show();
  }
  // console.log(state);
}

export function resetGameTiles() {
  gameTiles.forEach((tile) => {
    tile.querySelector(".tile-played").innerHTML = "";
    tile.classList.remove("tile-x", "tile-o");
    tile.disabled = false;
  })
}

export function renderNextRound(state) {
  winnerDialog.close();
  changeTurnDisplay(state.playerTurn);
  toggleTurnOnGameBoardTilesContainer(state.playerTurn);
  resetGameTiles();
  renderGameTilesHoverState(state.playerTurn);
}