export class User{
  static create(user){
    return fetch("https://itirod-c3fae-default-rtdb.firebaseio.com/users.json", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type" : "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        user.id = response.name;
        return user;
      })
      .then(addToLocalStorage)
  }
}

function addToLocalStorage(user){
  const allUsers = getUsersFromLocalStorage();
  allUsers.push(user);
  localStorage.setItem("users", JSON.stringify(allUsers));
}

function getUsersFromLocalStorage(){
  return JSON.parse(localStorage.getItem("users") || "[]");
}