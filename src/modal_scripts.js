import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//Для кнопок закрытия
const closeButtons = document.getElementsByClassName("close-button");

const modalContainer = document.querySelector(".modal-container");

const modalButtons = document.getElementsByClassName("open-modal-button");

[...modalButtons].forEach((item) => {
  item.onclick = function () {
    const modalId = this.getAttribute("data-modal");

    if (modalId === "3") {
      const historyList = document.getElementById("history-list");
      historyList.innerHTML = "";
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          const db = getDatabase();
          const star = ref(db, "tickets");
          onValue(star, (snapshot) => {
            snapshot.forEach((childSnap) => {
              const childData = childSnap.val();
              if (childData.id === uid) {
                const ticketHistoryHTML = `
                  <li>
                  <a class="history-link" href="#">${childData.departurePlace}-${childData.arrivalPlace} ${childData.price}Br ${childData.departureDate}</a>
                  </li>
                  `;
                historyList.innerHTML += ticketHistoryHTML;
              }
            });
          });
        }
      });
    }

    const modalElem = document.querySelector(`.modal[data-modal="${modalId}"]`);

    modalElem.classList.add("active");

    modalContainer.classList.add("active");
  };
});

[...closeButtons].forEach((item) => {
  item.addEventListener("click", (e) => {
    const modals = document.getElementsByClassName("modal");
    [...modals].forEach((modal) => {
      modal.classList.remove("active");
      modalContainer.classList.remove("active");
    });
  });
});
