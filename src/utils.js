export function isRegisterValid(name, email, password) {
  return name.length >= 3 && email.length >= 3 && password.length >= 6;
}

export function isLoginValid(email, password) {
  return email.length >= 3 && password.length >= 6;
}

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomTime(){
  const hours = Math.round(Math.random() * 23);
  const mins = Math.round(Math.random() * 59);
  const hourFormat = (hours < 10 ? "0" : "");
  const minFormat = (mins < 10 ? "0" : "");
  return String(hourFormat + hours + " : " + minFormat + mins);
}