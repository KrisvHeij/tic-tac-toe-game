import {state, getSelectedMark} from "./state.js";



const startBtn = document.querySelectorAll(".btn-newgame");


function startGame() {
  const mark = getSelectedMark();
  console.log(mark);
}


// Event listeners
startGame();
console.log(state)