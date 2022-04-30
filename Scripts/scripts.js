const menuButton = document.querySelector(".menu-button");
const mobileMenuContainer = document.querySelector(".mobile-menu-container");
const mobileMenu = document.querySelector(".mobile-menu");

menuButton.addEventListener("click", () => {
  menuButton.classList.toggle("active");
  mobileMenuContainer.classList.toggle("mobile-menu-container-active");
  mobileMenu.classList.toggle("mobile-menu-active");
});



const todayDate = new Date().toISOString().split("T")[0];
const departureDate = document.getElementById("departure-date");
departureDate.setAttribute("min", todayDate);

const arrivalDate = document.getElementById("arrival-date");
arrivalDate.setAttribute("min", todayDate);

departureDate.onchange = ({ target: { value } }) => {
  arrivalDate.setAttribute("min", value || todayDate);
};
