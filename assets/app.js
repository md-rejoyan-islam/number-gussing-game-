const startBtn = document.querySelector("#start-btn");

// modal
const modal = document.querySelector("#modal");

// guess number list
const guessNumberArray = [];

// start button event listener
startBtn.addEventListener("click", () => {
  const lowerValue = document.querySelector("#lower-number").value;
  const highValue = document.querySelector("#higher-number").value;
  if (!lowerValue) return errorPopupShow("Please enter a lower value");
  if (!highValue) return errorPopupShow("Please enter a higher value");

  // modal show

  modal.classList.remove("hidden");
  modalInnerHTML(1);
  //   customIterator(1).next();
  //   customIterator(2).next();

  // value receive

  // turn 1
  //   modalInnerHTML(1,)
});

// error popup function
function errorPopupShow(message) {
  const errorPopup = document.querySelector("#error-popup");
  const errorMessage = document.querySelector("#error-message");
  errorPopup.classList.remove("hidden");
  errorMessage.textContent = message;

  // close popup after 3 seconds
  setTimeout(() => {
    errorPopup.classList.add("hidden");
  }, 3000);
}

// random number between two numbers
function randomNumBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// innerHTML add in modal

function modalInnerHTML(turn) {
  modal.classList.remove("hidden");
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
              <h2 class="font-semibold">Previous guesses</h2>
              <ol class="list-decimal list-inside">
                <li>1</li>
                <li>2</li>
                <li>3</li>
              </ol>
            </div>
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

// value receive from modal
modal.addEventListener("click", function (e) {
  if (e.target.id === "guessBtn") {
    const guessValue =
      e.target.parentElement.parentElement.querySelector("#guessNumber").value;

    // value validation
    if (!guessValue) return errorPopupShow("Please enter a guess");

    guessNumberArray.push(guessValue);

    if (guessNumberArray.length === 3) {
      return modal.classList.add("hidden");
    }
    modalInnerHTML(guessNumberArray.length + 1);
  }
});
