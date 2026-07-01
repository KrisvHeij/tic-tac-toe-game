export const state = createInitialState();

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
    playerTurn: "x",
    scoreX: 0,
    scoreO: 0,
    ties: 0
  }
}

export function setSelectedMark(mark) {
  state.playerOne.mark = mark;
}

export function setPlayerTwoMark() {
  state.playerTwo.mark = state.playerOne.mark === "x" ? "o" : "x";
}

export function setPlayers(target) {
  if (target.id === "cpu") {
    state.playerOne.name = "you"
    state.playerTwo.name = "cpu";
  } else {
    state.playerOne.name = "p1";
    state.playerTwo.name = "p2";
  }
}

export function setPlayerTurn() {
  state.playerTurn = state.playerTurn === "x" ? "o" : "x";
}