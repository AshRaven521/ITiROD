import "../style.css"
import "../Details/details-style.css"
import "../Login-register/window-style.css"
import "../modal-window.css"
import "../mobile-style.css"
import "../Search_history/history_style.css"
import "./modal_scripts.js"
import "./scripts.js"
import {isValid} from "./utils.js"

document.querySelector(".login-button").onclick = () => {
  const nameInput = document.getElementById("name-input");
  const loginInput = document.getElementById("login-input");
  const passwordInput = document.getElementById("password-input");
  console.log(nameInput);

  if(isValid(nameInput.value) && isValid(loginInput.value) && isValid(passwordInput.value)){
    const user = {
      name: nameInput.value.trim(),
      login: loginInput.value.trim(),
      password: passwordInput.value.trim()
    };

  }
};
