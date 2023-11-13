const startBtn = document.querySelector("#start-btn");

// start button event listener
startBtn.addEventListener("click", () => {
  const lowerValue = document.querySelector("#lower-number").value;
  const highValue = document.querySelector("#higher-number").value;
  if (!lowerValue) return errorPopupShow("Please enter a lower value");
  if (!highValue) return errorPopupShow("Please enter a higher value");
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
