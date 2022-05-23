import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//Для кнопок закрытия
const closeButtons = document.getElementsByClassName("close-button");
const modalContainer = document.querySelector(".modal-container");
const modalButtons = document.getElementsByClassName("open-modal-button");

const home = `<main class="main">
<div class="container">
  <div class="mobile-menu-container">
    <aside class="mobile-menu">
      <div class="buttons">
        <hr class="mobile-hr" />
        <a
          href="#"
          class="mobile-modal-button open-modal-button"
          data-modal="1"
          id="mobile-reg-button"
          >Зарегестрироваться</a
        >
        <a
          href="#"
          class="mobile-modal-button open-modal-button"
          data-modal="2"
          id="mobile-login-button"
          >Войти</a
        >
        <a
          href="#"
          class="mobile-modal-button open-modal-button exit-button"
          id="mobile-exit-button"
          >Выйти</a
        >
        <a
          href="#"
          class="mobile-modal-button open-modal-button"
          data-modal="3"
          id="mobile-history-button"
          >История поиска</a
        >
      </div>
      <hr class="mobile-hr" />
      <div class="tech-support-info">
        <span class="mobile-tech-support">Тех. поддержка: aviakolhoz@mail.com</span>
        <span class="mobile-tech-support"> +375447322813</span>
      </div>
    </aside>
  </div>
  <div class="search-group">
    <section class="search">
      <h2>Поиск</h2>
      <form class="search-form">
        <div class="search-form__field">
          <label for="departure-input">Место отправления:</label>
          <div class="search-form__input">
            <input class="search-form__departure-input" id="departure-input" />
            <span class="search-form__departure-code">Код</span>
          </div>
        </div>
        <div class="search-form__field">
          <label for="arrival-input">Место прибытия:</label>
          <div class="search-form__input">
            <input class="search-form__arrival-input" id="arrival-input" />
            <span class="search-form__arrival-code">Код</span>
          </div>
        </div>
        <div class="search-form__field">
          <label for="departure-date">Дата отправления:</label>
          <input type="date" id="departure-date" />
        </div>
        <div class="search-form__field">
          <label for="arrival-date">Дата прибытия: </label>
          <input type="date" id="arrival-date" />
        </div>
        <button type="button" class="search-button" id="ticket-search-button">Поиск</button>
      </form>
    </section>
    <section class="map-search">
      <h2>Карта поиска</h2>
      <div class="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.0892940111835!2d27.592458115628546!3d53.91238913986242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbcfaf1d38974b%3A0x3d097c7a85e0db13!2z0JHQk9Cj0JjQoCwg0LrQvtGA0L_Rg9GBIOKEliA0!5e0!3m2!1sru!2sby!4v1647969009837!5m2!1sru!2sby"
          width="100%"
          height="400"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  </div>
  <hr class="search-hr" />
  <section class="search-result">
    <h2>Результаты поиска</h2>
    <ul class="tickets-list" id="list"></ul>
  </section>
</div>
</main>`;
const contact = '<h1>I am contact Page</h1>';
const about = `
        <div class="history">
          <h2>История поиска</h2>
          <ul class="history-ul" id="history-list">
            <li class="loading" id="loading">Загрузка...</li>
          </ul>
        </div>
        `;
const routes = {
  '/' : home,
  '/contact' : contact,
  '/about' : about
};

const rootDiv = document.getElementById('root');
rootDiv.innerHTML = routes[window.location.pathname];

const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname
  );
  rootDiv.innerHTML = routes[pathname];
}

window.onpopstate = () => {
  //rootDiv.innerHTML = routes[window.location.pathname];
}


[...modalButtons].forEach((item) => {
  item.onclick = function () {
    const modalId = this.getAttribute("data-modal");
    
    if (modalId === "1" || modalId === "2") {
      const modalElem = document.querySelector(`.modal[data-modal="${modalId}"]`);
      modalElem.classList.add("active");
      modalContainer.classList.add("active");
    }
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

const desktopHistory = document.getElementById("desktop-history-button");
let historyList = "";
desktopHistory.onclick = async function () {
  onNavigate('/about');
  try {
    const auth = getAuth();
    const user = auth.currentUser;
     
    if (user) {      
      historyList = document.getElementById("history-list");
      const loadingLi = document.getElementById("loading");
          const uid = user.uid;
          const db = getDatabase();
          const star = ref(db, "tickets");
          onValue(star, (snapshot) => {
            snapshot.forEach((childSnap) => {
              const childData = childSnap.val();
              if (childData.id === uid) {
                
                const ticketHistoryHTML = `
                  <li>
                  <a class = "history-link" href="./">${childData.departurePlace}-${childData.arrivalPlace} ${childData.price}Br ${childData.departureDate}</a>
                  </li>
                  `;
                  loadingLi.remove();
                historyList.innerHTML += ticketHistoryHTML;
              }
            });
          });
          
    }    
  }
  catch (e) {
    alert(e);
  }
};
