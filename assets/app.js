"use strict";

// query selector
const startBtn = document.querySelector("#start-btn");

const restartBtn = document.querySelector("#restart-btn");

const resultDiv = document.querySelector("#result-div");

const startDiv = document.querySelector("#start-div");

// modal
const modal = document.querySelector("#modal");

// guess number list
const guessNumberArray = [];
const correctNumber = [];

// input value
let lowerValue;
let highValue;

// start button event listener
startBtn.addEventListener("click", () => {
  // before all data clear
  guessNumberArray.length = 0;
  correctNumber.length = 0;

  // receive input value
  lowerValue = Number(document.querySelector("#lower-number").value);
  highValue = Number(document.querySelector("#higher-number").value);

  // show negative value alert
  if (lowerValue < 0 || highValue < 0)
    return errorPopupShow("Please enter positive value");

  // empty input field validation
  if (!lowerValue) return errorPopupShow("Please enter a lower value");
  if (!highValue) return errorPopupShow("Please enter a higher value");

  // value validation
  if (Number(lowerValue) >= Number(highValue))
    return errorPopupShow("Lower value must be less than higher value");

  // modal show
  modal.classList.remove("hidden");
  modalInnerHTML(1);
});

// error popup function
function errorPopupShow(message) {
  // select error and message div
  const errorPopup = document.querySelector("#error-popup");
  const errorMessage = document.querySelector("#error-message");

  //show error popup and message
  errorPopup.classList.remove("hidden");
  errorMessage.textContent = message;

  // close popup after 3 seconds
  setTimeout(() => {
    errorPopup.classList.add("hidden");
  }, 3000);
}

// modal event listener for value submit button
modal.addEventListener("click", function (e) {
  // submit button event listener
  if (e.target.id === "guessBtn") {
    // select guess number
    const guessValue =
      e.target.parentElement.parentElement.querySelector("#guessNumber").value;

    // if guess  field value is empty
    if (!guessValue) return errorPopupShow("Please enter a guess");

    // guess value validation
    if (guessValue < lowerValue || guessValue > highValue)
      return errorPopupShow(
        `Please enter a number between ${lowerValue} and ${highValue}`
      );

    // random number generate between two numbers
    const randomNumber = randomNumBetween(lowerValue, highValue);

    // exact number store in array
    if (guessNumberArray.length < 1) {
      correctNumber.push(randomNumber);
    }

    // store guess number in array
    guessNumberArray.push(guessValue);

    // if guess number match with exact number
    if (Number(guessValue) === correctNumber[0]) {
      // hide start button
      startBtn.classList.add("hidden");
      // hide start div
      startDiv.classList.add("hidden");
      // hide modal
      modal.classList.add("hidden");
      // show result div
      resultDiv.classList.remove("hidden");
      // show result div innerHTML
      resultHTML(true);
      return;
    }

    // loop stop after 3 times
    if (guessNumberArray.length === 3) {
      //hide start button
      startBtn.classList.add("hidden");
      // hide start div
      startDiv.classList.add("hidden");

      // show result div
      resultDiv.classList.remove("hidden");

      // show result div innerHTML
      resultHTML(false);
      // hide modal
      return modal.classList.add("hidden");
    }
    modalInnerHTML(guessNumberArray.length + 1);
  }
});

// random number between two numbers
function randomNumBetween(min, max) {
  return Number(
    Math.floor(Math.random() * (Number(max) - Number(min) + 1)) + Number(min)
  );
}

// result div innerHTML
function resultHTML(result) {
  restartBtn.classList.remove("hidden");

  resultDiv.innerHTML = `
    <div class="card">
            <h2 class="text-2xl text-center font-semibold py-2">Result</h2>
          
            ${
              result
                ? `<p class="bg-green-400 text-white my-2 py-2 px-4 rounded-sm">
              Winner
            </p>`
                : `   <p class="bg-red-400 text-white my-2 py-2 px-4 rounded-sm">
              !!! Game Over !!! Loser !!!
            </p>`
            }
            
          </div>
    `;
}

restartBtn.addEventListener("click", () => {
  resultDiv.classList.add("hidden");
  startBtn.classList.remove("hidden");
  restartBtn.classList.add("hidden");
  startDiv.classList.remove("hidden");
  correctNumber.length = 0;
  guessNumberArray.length = 0;
});

// innerHTML add in modal
function modalInnerHTML(turn) {
  modal.innerHTML = `
    <div class="modal-content flex justify-center h-full items-center">
        <!-- modal body  -->
        <div class="grow .card bg-white rounded-md max-w-[500px]">
          <div class="card-container pt-2 bg-zinc-100 rounded-t-md">
            <h1 class="py-2 font-semibold text-center text-2xl">Turn-${turn}</h1>
            <hr />
          </div>

          <div class="card-body p-4">
            <div class="flex justify-between items-center">
              <label for="" class="w-full">Enter a guess</label>
              <input
                type="number"
                id="guessNumber"
                class="w-full py-2 px-4 focus:outline-none border border-zinc-200 focus:ring-4 focus:ring-sky-100 rounded-md"
              />
            </div>
            <!-- previous guesses  -->
            <div class="my-5">
            ${
              guessNumberArray.length > 0
                ? `<p class="text-red-400">${
                    guessNumberArray[turn - 2] > correctNumber[0]
                      ? "Last guess was  high!"
                      : "Last guess was  low!"
                  }</p>`
                : ""
            }
            </div>
            ${
              guessNumberArray.length > 0
                ? `<div class="my-5">
              <h2 class="font-semibold text-[18px]">Previous guesses</h2>
              <ol class="list-decimal list-inside">
                ${guessNumberArray
                  .map((number) => `<li> ${number}</li>`)
                  .join("")}
                
              </ol>
            </div>`
                : ""
            }
            <div class="my-5">
              <button
                class="bg-violet-500 hover:bg-violet-600 rounded-md py-2 px-4 text-white w-full font-semibold"
                id="guessBtn"
              >
                Submit guess
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
}
