import "../style.css";
import "../Details/details-style.css";
import "../Login-register/window-style.css";
import "../modal-window.css";
import "../mobile-style.css";
import "../Search_history/history_style.css";
import "./modal_scripts.js";
import "./scripts.js";
import { isRegisterValid, isLoginValid } from "./utils.js";
import { User } from "./user.js";
import { authWithEmailAndPassword, registerWithEmailAndPassword } from "./auth";
import { Ticket } from "./ticket";

const regButton = document.getElementById("register-button");
const loginButton = document.getElementById("login-button");

const nameInput = document.getElementById("name-input");
const emailRegInput = document.getElementById("email-reg-input");
const passwordRegInput = document.getElementById("password-reg-input");

const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");

const desktopHistoryButton = document.getElementById("desktop-history-button");
const mobileHistoryButton = document.getElementById("mobile-history-button");

const searchTicketButton = document.getElementById("ticket-search-button");

//Если при загрузке страницы инпуты заполнены, то кнопка включена, иначе выключена
if (!isLoginValid(emailInput.value, passwordInput.value)) {
  loginButton.setAttribute("disabled", true);
} else {
  loginButton.removeAttribute("disabled");
}

//Если при загрузке страницы инпуты заполнены, то кнопка включена, иначе выключена
if (!isRegisterValid(nameInput.value, emailRegInput.value, passwordRegInput.value)) {
  regButton.setAttribute("disabled", true);
} else {
  regButton.removeAttribute("disabled");
}

//При изменении инпутов кнопка включается/выключается
nameInput.oninput = () => {
  if (!isRegisterValid(nameInput.value, emailRegInput.value, passwordRegInput.value)) {
    regButton.setAttribute("disabled", true);
  } else {
    regButton.removeAttribute("disabled");
  }
};

emailRegInput.oninput = () => {
  if (!isRegisterValid(nameInput.value, emailRegInput.value, passwordRegInput.value)) {
    regButton.setAttribute("disabled", true);
  } else {
    regButton.removeAttribute("disabled");
  }
};

passwordRegInput.oninput = () => {
  if (!isRegisterValid(nameInput.value, emailRegInput.value, passwordRegInput.value)) {
    regButton.setAttribute("disabled", true);
  } else {
    regButton.removeAttribute("disabled");
  }
};

regButton.onclick = async () => {
  // e.preventDefault();

  // if (
  //   isRegisterValid(nameInput.value) &&
  //   isRegisterValid(emailRegInput.value) &&
  //   isRegisterValid(passwordRegInput.value)
  // ) {
  // const user = {
  //   name: nameInput.value.trim(),
  //   login: emailRegInput.value.trim(),
  //   password: passwordRegInput.value.trim(),
  // };

  // regButton.setAttribute("disabled", true);
  // User.create(user).then(() => {
  //   nameInput.value = "";
  //   emailRegInput.value = "";
  //   passwordRegInput.value = "";
  //   regButton.removeAttribute("disabled");
  // });
  try {
    await registerWithEmailAndPassword(
      nameInput.value,
      emailRegInput.value,
      passwordRegInput.value
    );
    const closeButton = document.querySelector(".close-button[data-modal='2']");
    closeButton.dispatchEvent(new Event("click"));
    document.dispatchEvent(new CustomEvent("auth", { detail: { isSignedIn: true } }));
    nameInput.value = "";
    emailRegInput.value = "";
    passwordRegInput.value = "";
  } catch ({ message }) {
    alert(message);
  }
};
// };

emailInput.oninput = () => {
  if (!isLoginValid(emailInput.value, passwordInput.value)) {
    loginButton.setAttribute("disabled", true);
  } else {
    loginButton.removeAttribute("disabled");
  }
};

passwordInput.oninput = () => {
  if (!isLoginValid(emailInput.value, passwordInput.value)) {
    loginButton.setAttribute("disabled", true);
  } else {
    loginButton.removeAttribute("disabled");
  }
};

loginButton.onclick = async () => {
  try {
    await authWithEmailAndPassword(emailInput.value, passwordInput.value);
    const closeButton = document.querySelector(".close-button[data-modal='1']");
    closeButton.dispatchEvent(new Event("click"));
    document.dispatchEvent(new CustomEvent("auth", { detail: { isSignedIn: true } }));
    emailInput.value = "";
    passwordInput.value = "";
  } catch ({ message }) {
    alert(message);
  }
};

searchTicketButton.onclick = async () => {
  try{
    await Ticket.create()
  }catch(e){
    alert(e);
  }
}


