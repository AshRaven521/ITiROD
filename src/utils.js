export function isRegisterValid(name, email, password) {
  return name.length >= 3 && email.length >= 3 && password.length >= 6;
}

export function isLoginValid(email, password) {
  return email.length >= 3 && password.length >= 3;
}

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
