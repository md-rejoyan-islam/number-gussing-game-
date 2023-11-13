const startBtn = document.querySelector("#start-btn");

// modal
const modal = document.querySelector("#modal");

// start button event listener
startBtn.addEventListener("click", () => {
  const lowerValue = document.querySelector("#lower-number").value;
  const highValue = document.querySelector("#higher-number").value;
  if (!lowerValue) return errorPopupShow("Please enter a lower value");
  if (!highValue) return errorPopupShow("Please enter a higher value");

  // modal show
  modal.classList.remove("hidden");
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

function modalInnerHTML() {}
