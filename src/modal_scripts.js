//Для кнопок закрытия
const closeButtons = document.getElementsByClassName("close-button");

const modalContainer = document.querySelector(".modal-container");

const modalButtons = document.getElementsByClassName('open-modal-button');

[...modalButtons].forEach(item => {
    item.onclick = function() {
        const modalId = this.getAttribute('data-modal');
        const modalElem = document.querySelector(`.modal[data-modal="${modalId}"]`);
        
        modalElem.classList.add('active');
        
        modalContainer.classList.add("active"); 
    }
});

[...closeButtons].forEach(item => {

    item.addEventListener('click', e => {
       const modals = document.getElementsByClassName("modal");
       [...modals].forEach(modal =>{
           modal.classList.remove('active');
           modalContainer.classList.remove('active');
       });
    });

 });
