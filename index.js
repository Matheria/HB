const input = document.querySelector(".js-input");
const form = document.querySelector("form");
const loadBtn = document.querySelector(".js-load");
const resultsContainer = document.querySelector(".results-container");

// Валидация input
const inputValidation = () => {
  let inputValue = input.value.trim();

  try {
    if (inputValue === "") throw new Error("Заполните поле ввода");
    if (!Number(inputValue)) throw new Error("Введите числовое значение");
    if (inputValue.length > 10 || inputValue.length < 5)
      throw new Error(`Число должно быть в интервале от 5 до 10`);

    resultsContainer.innerHTML = inputValue;
  } catch (err) {
    resultsContainer.innerHTML = `<p>${err.message}</p>`;
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  inputValidation();
});

// Функция lottery на async/await
const lottery = async () => {
  console.log("Вы начали игру");

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve() : reject();
    }, 1000);
  });

  try {
    await promise;
    console.log("Вы выиграли");
    console.log("Вам заплатили");
  } catch {
    console.log("Вы проиграли");
  } finally {
    console.log("Игра закончена");
  }
};

lottery();
