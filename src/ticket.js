import { getRandomNumber } from "./utils";
import {apiKey} from "./config.json"

export class Ticket {
  static async create(ticket) {
    const response = await fetch("https://itirod-c3fae-default-rtdb.firebaseio.com/tickets.json", {
      method: "POST",
      body: JSON.stringify(ticket),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response_1 = await response.json();
    console.log(response_1);
    ticket.id = response_1.name;
    const ticket_1 = ticket;
    const result_1 = await addToLocalStorage(ticket_1);
    return Ticket.renderTicketsList(result_1);
  }

  static fetch(token) {
    return fetch(`https://itirod-c3fae-default-rtdb.firebaseio.com/tickets.json?auth=${apiKey}`)
      .then((response) => response.json())
      .then((tickets) => {});
  }

  static renderTicketsList() {
    const tickets = getTicketsFromLocalStorage();

    const html = tickets.length
      ? tickets.map(toCard).join("")
      : `<div>Вы пока не искали билеты</div>`;

    const list = document.getElementsByClassName("tickets-list");
    list.innerHTML = html;
  }
}

const departurePlace = document.getElementById("departure-input");
const departureDate = document.getElementById("departure-date");
const arrivalPlace = document.getElementById("arrival-input");
const arrivalDate = document.getElementById("arrival-date");

function toCard() {
  return `
      <li class="ticket">
      <div class="price">
        <span>Цена</span>
        <span>${getRandomNumber(800, 3000)}Br</span>
      </div>

      <div class="line"></div>

      <div class="direction">
        <div class="departure">
          <span>${departurePlace}</span>
          <span>${getRandomNumber(0, 23)}:${getRandomNumber(0, 59)}</span>
          <span>${departureDate}</span>
        </div>

        <div class="departure-info-container">
          <span class="arrow-image"></span>
          <a
            href="#"
            class="departure-info-link open-modal-button"
            data-modal="4">
            Подробнее о месте прибытия
          </a>
          <a
            href="#"
            class="mobile-departure-info-link open-modal-button"
            data-modal="4">
            Подробнее
          </a>
        </div>

        <div class="arrival">
          <span>${arrivalPlace}</span>
          <span>${getRandomNumber(0, 23)}:${getRandomNumber(0, 59)}</span>
          <span>${arrivalDate}</span>
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
