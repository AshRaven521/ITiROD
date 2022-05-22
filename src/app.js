import "../style.css";
import "../Details/details-style.css";
import "../Login-register/window-style.css";
import "../modal-window.css";
import "../mobile-style.css";
import "../Search_history/history_style.css";
import "./modal_scripts.js";
import "./scripts.js";
import { isRegisterValid, isLoginValid } from "./utils.js";
import { Ticket } from "./ticket.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getRandomNumber, getRandomTime } from "./utils.js";
import { initializeApp } from "firebase/app";
//Для стилей кнопок Зарегестрироваться, Войти, Выйти
import {} from "./auth.js";


//Взаимодействие с firebase
const { apiKeySecret } = require("./config.json");
const firebaseConfig = {
  apiKey: apiKeySecret,
  authDomain: "itirod-c3fae.firebaseapp.com",
  projectId: "itirod-c3fae",
  storageBucket: "itirod-c3fae.appspot.com",
  messagingSenderId: "6643513081",
  appId: "1:6643513081:web:8bb20868910f04354ed428",
  measurementId: "G-DD2B8QQDBK",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const nameInput = document.getElementById("name-input");
const emailRegInput = document.getElementById("email-reg-input");
const passwordRegInput = document.getElementById("password-reg-input");

const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");

const regButton = document.getElementById("register-button");
const loginButton = document.getElementById("login-button");
const searchTicketButton = document.getElementById("ticket-search-button");

const departurePlace = document.getElementById("departure-input");
const departureDate = document.getElementById("departure-date");
const arrivalPlace = document.getElementById("arrival-input");
const arrivalDate = document.getElementById("arrival-date");


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
  try {
    await createUserWithEmailAndPassword(auth, emailRegInput.value, passwordRegInput.value);

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
    localStorage.removeItem("token");
    await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        localStorage.setItem("token", uid);
      }
    });

    const closeButton = document.querySelector(".close-button[data-modal='1']");
    closeButton.dispatchEvent(new Event("click"));
    document.dispatchEvent(new CustomEvent("auth", { detail: { isSignedIn: true } }));
    emailInput.value = "";
    passwordInput.value = "";
  } catch ({ message }) {
    alert(message);
  }
};

searchTicketButton.onclick = async function () {
  try {
    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;
      const ticket = {
        id: uid,
        price: getRandomNumber(1000, 3000),
        departureTime: getRandomTime(),
        departurePlace: departurePlace.value.trim(),
        departureDate: departureDate.value.trim(),
        arrivalTime: getRandomTime(),
        arrivalPlace: arrivalPlace.value.trim(),
        arrivalDate: arrivalDate.value.trim(),
      };
      await Ticket.create(ticket);

      const modalContainer = document.querySelector(".modal-container");
      document.querySelector("#info-link").onclick = () => {
        const modalElem = document.querySelector(`.modal[data-modal="4"]`);
        modalElem.classList.add("active");
        modalContainer.classList.add("active");
      };
      document.querySelector("#mobile-info-link").onclick = () => {
        const modalElem = document.querySelector(`.modal[data-modal="4"]`);
        modalElem.classList.add("active");
        modalContainer.classList.add("active");
      };
    }
  } catch (e) {
    alert(e);
  }
};

