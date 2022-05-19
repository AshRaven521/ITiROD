//api ключ к вашей базе в firebase
const {apiKeySecret} = require("./config.json");

export async function authWithEmailAndPassword(email, password) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKeySecret}`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  
  const { idToken, error } = await response.json();
  if (error) throw new Error("Неправильный e-mail или пароль!");
  localStorage.setItem("token", idToken);
  return idToken;
}

export async function registerWithEmailAndPassword(name, email, password) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKeySecret}`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { idToken, error } = await response.json();
  if(error) throw new Error(error.message);
  localStorage.setItem("token", idToken);
  return idToken;
}

const desktopRegButton = document.getElementById("desktop-reg-button");
const desktopLoginButton = document.getElementById("desktop-login-button");

const mobileRegButton = document.getElementById("mobile-reg-button");
const mobileLoginButton = document.getElementById("mobile-login-button");

const desktopExitButton = document.getElementById("desktop-exit-button");
const mobileExitButton = document.getElementById("mobile-exit-button");

const desktopHistoryButton = document.getElementById("desktop-history-button");
const mobileHistoryButton = document.getElementById("mobile-history-button");

const departurePlace = document.getElementById("departure-input");
const departureDate = document.getElementById("departure-date");
const arrivalPlace = document.getElementById("arrival-input");
const arrivalDate = document.getElementById("arrival-date");
const ticketsList = document.getElementById("list");

function exit() {
  desktopExitButton.style.display = "none";
  mobileExitButton.style.displaconst = "none";
  departurePlace.value = "";
  departureDate.value = "";
  arrivalPlace.value = "";
  arrivalDate.value = "";
  ticketsList.innerHTML = "";

  localStorage.removeItem("token");
  document.dispatchEvent(new CustomEvent("auth", { detail: { isSignedIn: false } }));
}
desktopExitButton.onclick = exit;
mobileExitButton.onclick = exit;

function setStyles(flag) {
  const loginStyle = `opacity: ${flag ? 0 : 1}; visibility: ${flag ? "hidden" : "visible"}`;
  const exitStyle = `opacity: ${!flag ? 0 : 1}; visibility: ${!flag ? "hidden" : "visible"}`;

  desktopRegButton.style.cssText = loginStyle;
  desktopLoginButton.style.cssText = loginStyle;
  mobileRegButton.style.cssText = loginStyle;
  mobileLoginButton.style.cssText = loginStyle;
  desktopExitButton.style.cssText = exitStyle;
  mobileExitButton.style.cssText = exitStyle;
  desktopHistoryButton.style.cssText = exitStyle;
  mobileHistoryButton.style.cssText = exitStyle;
}
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  setStyles(token);
});

document.addEventListener("auth", ({ detail }) => {
  setStyles(detail.isSignedIn);
});
