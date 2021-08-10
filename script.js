"use strict";
const p1Block = document.querySelector(".player1");
const p2Block = document.querySelector(".player2");
const rollDice = document.querySelector(".roll-dice");
const newGame = document.querySelector(".new-game");
const hold = document.querySelector(".hold");
const dice = document.querySelector(".dice");
const p1_Heading = document.querySelector(".p1-header");
const p2_Heading = document.querySelector(".p2-header");
let currentScoreP1 = document.querySelector(".p1-score");
let currentScoreP2 = document.querySelector(".p2-score");
const p1_Status = document.querySelector(".p1-status");
const p2_Status = document.querySelector(".p2-status");
const p1_Final = document.querySelector(".player1score");
const p2_Final = document.querySelector(".player2score");
let x;
let p1_Score = 0;
let p2_Score = 0;
let p1_FinalScore = 0;
let p2_FinalScore = 0;

function rollTheDice() {
  x = Math.floor(Math.random() * 6) + 1;
  dice.classList.remove("hidden");
  dice.src = "dice-" + x + ".png";
}
function resetP1Current() {
  currentScoreP1.innerHTML = 0;
  p1_Score = 0;
}
function resetP2Current() {
  currentScoreP2.innerHTML = 0;
  p2_Score = 0;
}
function transitionP1toP2() {
  p1Block.style.backgroundColor = "#261c2c";
  p2Block.style.backgroundColor = "#3e2c41";
  p1_Status.classList.add("hidden");
  p2_Status.classList.remove("hidden");
}
function transitionP2toP1() {
  p1Block.style.backgroundColor = "#3e2c41";
  p2Block.style.backgroundColor = "#261c2c";
  p2_Status.classList.add("hidden");
  p1_Status.classList.remove("hidden");
}

rollDice.addEventListener("click", function () {
  if (p1_FinalScore < 100 && p2_FinalScore < 100) {
    rollTheDice();
    if (p2_Status.classList.contains("hidden")) {
      if (x !== 1) {
        p1_Score = Number(p1_Score) + x;
        currentScoreP1.innerHTML = p1_Score;
      } else {
        transitionP1toP2();
        resetP1Current();
      }
    } else {
      if (x !== 1) {
        p2_Score = Number(p2_Score) + x;
        currentScoreP2.innerHTML = p2_Score;
      } else {
        transitionP2toP1();
        resetP2Current();
      }
    }
  }
});

hold.addEventListener("click", function () {
  if (p1_FinalScore < 100 && p2_FinalScore < 100) {
    if (p2_Status.classList.contains("hidden")) {
      p1_FinalScore = p1_FinalScore + p1_Score;
      p1_Final.textContent = p1_FinalScore;
      if (p1_FinalScore >= 100) {
        p1Block.style.backgroundColor = "black";
        p1_Heading.innerHTML = `Player 1 Wins`;
      } else {
        resetP1Current();
        transitionP1toP2();
      }
    } else {
      p2_FinalScore = p2_FinalScore + p2_Score;
      p2_Final.textContent = p2_FinalScore;
      if (p2_FinalScore >= 100) {
        p2Block.style.backgroundColor = "black";
        p2_Heading.innerHTML = `Player 2 Wins`;
      } else {
        resetP2Current();
        transitionP2toP1();
      }
    }
  }
});

newGame.addEventListener("click", function () {
  resetP1Current();
  resetP2Current();
  transitionP2toP1();
  p1_FinalScore = 0;
  p2_FinalScore = 0;
  p1_Final.innerHTML = 0;
  p2_Final.innerHTML = 0;
  dice.classList.add("hidden");
  x = 0;
});
