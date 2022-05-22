//api ключ к вашей базе в firebase
const {apiKeySecret} = require("./config.json");

export class Ticket {
  static async create(ticket) {
    const response = await fetch("https://itirod-c3fae-default-rtdb.firebaseio.com/tickets.json", {
      method: "POST",
      body: JSON.stringify(ticket),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const fullResponse = await response.json();
    ticket.id = fullResponse.name;
    const ticket_1 = ticket;
    addToLocalStorage(ticket_1);
    return Ticket.renderTicketsList(ticket_1.price, ticket_1.departureTime, ticket_1.arrivalTime);
  }

  static async fetch(token) {
    const response = await fetch(`https://itirod-c3fae-default-rtdb.firebaseio.com/tickets.json?auth=${token}`);
    const tickets = await response.json();
    if (tickets.error) {
      return alert(tickets.error);
    }
    return tickets ? Object.keys(tickets).map(key => ({
      ...tickets[key],
      id: key
    })) : [];
  }

  static renderTicketsList(ticketPrice, depTime, arrTime) {
    const tickets = getTicketsFromLocalStorage();

    const html = tickets.length
      ? tickets.map(() => toCard(ticketPrice, depTime, arrTime)).slice(-1)
      : alert("Вы пока не искали билетов");

    const list = document.getElementById("list");
    list.innerHTML = html;
  }
}

const departurePlace = document.getElementById("departure-input");
const departureDate = document.getElementById("departure-date");
const arrivalPlace = document.getElementById("arrival-input");
const arrivalDate = document.getElementById("arrival-date");

function toCard(price, departTime, arriveTime) {
  return `
      <li class="ticket">
      <div class="price">
        <span>Цена</span>
        <span>${price}Br</span>
      </div>

      <div class="line"></div>

      <div class="direction">
        <div class="departure">
          <span>${departurePlace.value}</span>
          <span>${departTime}</span>
          <span>${departureDate.value}</span>
        </div>

        <div class="departure-info-container">
          <span class="arrow-image"></span>
          <a
            href="https://ru.wikipedia.org/wiki/${arrivalPlace.value}" target="_blank"
            class="departure-info-link open-modal-button"
            data-modal="4"
            id="info-link"
            >
            Подробнее о месте прибытия
          </a>
          <a
            href="#"
            class="mobile-departure-info-link open-modal-button"
            data-modal="4"
            id="mobile-info-link">
            Подробнее
          </a>
        </div>

        <div class="arrival">
          <span>${arrivalPlace.value}</span>
          <span>${arriveTime}</span>
          <span>${arrivalDate.value}</span>
        </div>
      </div>
    </li>
  `;
}

function addToLocalStorage(ticket) {
  const allTickets = getTicketsFromLocalStorage();
  allTickets.push(ticket);
  localStorage.setItem("tickets", JSON.stringify(allTickets));
}

function getTicketsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tickets") || "[]");
}
