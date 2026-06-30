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
    playerTurn: true,
    scorePlayerOne: 0,
    scorePlayerTwo: 0,
    ties: 0
  }
}

export function getSelectedMark() {
  const radioInputs = document.querySelectorAll(".pick-mark-container input[type=radio]");

  for (const radio of radioInputs) {
    if (radio.checked) {
      state.playerOne.mark = radio.value;
    }
  }


}