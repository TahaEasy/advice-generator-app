const dice = document.querySelector("button.dice");
const adviceContentEl = document.querySelector(".advice-content");
const adviceIdEl = document.querySelector(".advice-id");

let advice = null;
let isLoading = false;

const startLoading = () => {
  isLoading = true;
  dice.classList.add("dice-loading");
};

const stopLoading = () => {
  isLoading = false;
  dice.classList.remove("dice-loading");
};

const putAdviceId = (id) => {
  adviceIdEl.innerHTML = `#${id}`;
};

const putContent = (advice) => {
  adviceContentEl.innerHTML = `"${advice.advice}"`;
  putAdviceId(advice.id);
  stopLoading();
};

const putError = (errorMessage) => {
  adviceContentEl.innerHTML = `An error occurred: ${errorMessage}`;
  putAdviceId(0);
  stopLoading();
};

dice.addEventListener("click", async () => {
  try {
    startLoading();
    let { slip } = await fetch(`https://api.adviceslip.com/advice`).then(
      (res) => res.json()
    );
    advice = slip;
    putContent(advice);
  } catch (e) {
    putError(e.message);
  }
});
