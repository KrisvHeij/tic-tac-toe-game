import {state, getSelectedMark} from "./state.js";



const startBtnContainer = document.querySelector(".button-container");


function startGame() {
  const mark = getSelectedMark();
  console.log(mark);
}

startGame();
console.log(state)

// Event listeners
startBtnContainer.addEventListener("click", (e) => {
  console.log(e.target)
  // startGame(e);
})