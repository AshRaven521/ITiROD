function openModalWindow(){

    //Для кнопок "История поиска", "Зарегестрироваться", "Войти"    
    const modalButtons = document.getElementsByClassName('modal-button');
    //Для кнопок закрытия
    const closeButtons = document.getElementsByClassName("close-button");
    //Для кнопок "Подробнее о месте прибытия"
    const infoButtons = document.getElementsByClassName('departure-info-link');
    //Для кнопок "Подробнее"(мобильная версия)
    const mobileInfoButtons = document.getElementsByClassName('mobile-departure-info-link');
    //Для кнопок "Зарегестрироваться", "Войти"(мобильная версия)
    const mobileModalButtons = document.getElementsByClassName('mobile-modal-button');
    //Для кнопки "История поиска"(мобильная версия)
    const mobileSearchButtons = document.getElementsByClassName('search-button');

    [...mobileSearchButtons].forEach(item =>{
        item.addEventListener('click', function(e){
            e.preventDefault();

            const modalId = this.getAttribute('data-modal');
            const elem = document.querySelector(`.modal[data-modal="${modalId}"]`);
            elem.classList.add('active');
        });
    });

    [...mobileModalButtons].forEach(item => {
        item.addEventListener('click', function(e){
            e.preventDefault();

            const modalId = this.getAttribute('data-modal');
            const elem = document.querySelector(`.modal[data-modal="${modalId}"]`);
            elem.classList.add('active');
        });
    });

    [...mobileInfoButtons].forEach(item => {
        item.addEventListener('click', function(e){
            e.preventDefault();

            const modalId = this.getAttribute('data-modal');
            const elem = document.querySelector(`.modal[data-modal="${modalId}"]`);
            elem.classList.add('active');
        });
    });

    [...infoButtons].forEach(item =>{
        item.addEventListener('click', function(e){
            e.preventDefault();

            const modalId = this.getAttribute('data-modal');
            const elem = document.querySelector(`.modal[data-modal="${modalId}"]`);
            elem.classList.add('active');
        });
    });
    
    [...modalButtons].forEach(item => {
        
        item.addEventListener('click', function(e) {
            
            e.preventDefault();         
            const modalId = this.getAttribute('data-modal');
            const modalElem = document.querySelector(`.modal[data-modal="${modalId}"]`);
            
            modalElem.classList.add('active');      
        });
    });

    [...closeButtons].forEach(item => {

        item.addEventListener('click', e => {
           const modals = document.getElementsByClassName("modal");
           [...modals].forEach(modal =>{
               modal.classList.remove('active');
           });
        });
  
     });
    
}