const loadBtn = document.querySelector(".js-load");
const resultsContainer = document.querySelector(".js-results");
const searchInput = document.querySelector(".js-input");

// Исправление fetch-запроса

class FetchError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class UserError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

loadBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const searchValue = searchInput.value.trim().toLowerCase();

  fetch(`https://api.github.com/users/${searchValue}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new FetchError(response.status);
      }
    })
    .then((data) => {
      if (!data.name) throw new UserError(`${searchValue}`);

      resultsContainer.innerHTML = `<div class="response-container">
                                      <img src="${data.avatar_url}">
                                      <p> Имя: <span>${data.name}</span><p>
                                      <p> О себе: <span>${data.bio}</span><p>
                                      <p> Кол-во репозиториев: <span>${data.public_repos}</span><p>
                                    </div>`;
    })
    .catch((err) => {
      if (err instanceof FetchError) {
        resultsContainer.innerHTML = `<div class="response-container">
                                         <p>Не удалось получить данные: ${err}<p>
                                       </div>`;
      } else if (err instanceof UserError) {
        resultsContainer.innerHTML = `<div class="response-container">
                                         <p>Пользователя ${searchValue} не существует.<p>
                                       </div>`;
      }
    });
});

// Axios - получение данных о пользователях
axios
  .get("https://jsonplaceholder.typicode.com/users")
  .then((res) => {
    res.data.map((userData) => {
      resultsContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="response-container">
          <p> Имя: <span>${userData.name}</span><p>
          <p> Эл. почта: <span>${userData.email}</span><p>
          <p> Вебсайт: <span>${userData.website}</span><p>
        </div>`
      );
    });
  })
  .catch((err) => {
    resultsContainer.innerHTML = `<div class="response-container">
                                    <p>Произошла ошибка: ${err.message}<p>
                                  </div>`;
  });
