export class User {
  static async create(user) {
    const response = await fetch("https://itirod-c3fae-default-rtdb.firebaseio.com/users.json", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const fullResponse = await response.json();
    user.id = user.name;
    const user_1 = user;
    return addToLocalStorage(user_1);
  }

  static async get() {
    const response = await fetch(`https://itirod-c3fae-default-rtdb.firebaseio.com/users/data.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const testResponse = await response.json();
  }
}

function addToLocalStorage(user) {
  const allUsers = getUsersFromLocalStorage();
  allUsers.push(user);
  localStorage.setItem("users", JSON.stringify(allUsers));
}

function getUsersFromLocalStorage() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}
