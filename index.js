const body = document.body;
const btnLight = document.querySelector(".btn_light");
const btnDark = document.querySelector(".btn_dark");

const handleThemeChange = () => {
  localStorage.getItem("dark") === "true"
    ? body.classList.add("body_dark")
    : body.classList.remove("body_dark");
};

btnDark.addEventListener("click", () => {
  localStorage.setItem("dark", "true");
  handleThemeChange();
});

btnLight.addEventListener("click", () => {
  localStorage.setItem("dark", "false");
  handleThemeChange();
});

handleThemeChange();
