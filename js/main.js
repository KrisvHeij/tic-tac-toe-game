import {state, getSelectedMark} from "./state.js";



const startBtnContainer = document.querySelector(".button-container");


function startGame(target) {
  getSelectedMark();

  console.log(target)
  console.log(state);
}


// Event listeners
startBtnContainer.addEventListener("click", (e) => {
  startGame(e.target);
})