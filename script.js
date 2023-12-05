"use strict";

let secretNumber = generateRandomNumber(1, 20);
let attemptsRem = 20;
let highScore = 0;

console.log(secretNumber);

const changeColor = function (className, color) {
  document.querySelector(`.${className}`).style.color = color;
};

document.querySelector(".check-btn").addEventListener("click", function () {
  const guess = Number(document.querySelector(".in").value);

  if (!guess && attemptsRem > 0) {
    displayMessage("Enter a valid number! 😕", "#C75941");
  } else if ((guess <= 0 || guess > 20) && attemptsRem > 0) {
    displayMessage("Please enter a number from 1 to 20 only! 😕", "#C75941");
  } else if (guess === secretNumber && attemptsRem > 0) {
    document.querySelector(".q").textContent = secretNumber;
    displayMessage("🎉 Correct Number!", "#2C57AC");
    document.querySelector(`body`).style.backgroundColor = "#59C06A";
    document.querySelector(`.box`).style.transition = "width 0.5s"; // Add transition property
    document.querySelector(`.box`).style.width = "200px";
    updateHighScore();
  } else {
    const difference = Math.abs(guess - secretNumber);
    let message = "";

    if (difference > 5) {
      message = "Too ";
    }

    if (guess > secretNumber) {
      message += "high! 📈";
    } else {
      message += "low! 📉";
    }

    attemptsRem--;

    if (attemptsRem <= 0) {
      if (attemptsRem === 0) {
        document.querySelector(".score-num").textContent = attemptsRem;
      }
      displayMessage("You lost! Try again 😢", "#DB522E");
    } else {
      document.querySelector(".score-num").textContent = attemptsRem;
      displayMessage(message, "#C75941");
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  resetGame();
});

function generateRandomNumber(min, max) {
  return Math.trunc(Math.random() * (max - min + 1)) + min;
}

function displayMessage(message, color) {
  document.querySelector(".message").textContent = message;
  changeColor("message", color);
}

function updateHighScore() {
  highScore = Math.max(highScore, attemptsRem);
  document.querySelector(".hscore-num").textContent = highScore;
}

function resetGame() {
  secretNumber = generateRandomNumber(1, 20);
  console.log(secretNumber);
  attemptsRem = 20;
  document.querySelector(".score-num").textContent = 20;
  document.querySelector(".q").textContent = "?";
  document.querySelector(".message").textContent = "Start guessing...";
  changeColor("q", "#222");
  changeColor("message", "#eeeeee");
  document.querySelector(".in").value = "";
  document.querySelector(`body`).style.backgroundColor = "#222";
  document.querySelector(`.box`).style.width = "120px";
}
