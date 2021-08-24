let fullName = document.querySelector('.profile__full-name');
let career = document.querySelector('.profile__career');
let newFullName = document.querySelector('.popup__item_type_name');
let newCareer = document.querySelector('.popup__item_type_about');
let popup = document.querySelector(".popup");
let popupClose = document.querySelector(".popup__close-button");

function openPopupOrClose() {
  if(!(popup.classList.contains("popup_open"))) {
    popup.classList.add("popup_open");
    const newFullNameVal = fullName.textContent;
    const newCareerVal = career.textContent;
    newFullName.value = newFullNameVal;
    newCareer.value = newCareerVal
  } else {
    popup.classList.remove("popup_open");
  }
}

let openPopupClick = document.querySelector('.profile__button');
let closePopupClick = document.querySelector('.popup__close-button');
openPopupClick.addEventListener("click",  openPopupOrClose);
closePopupClick.addEventListener("click",  openPopupOrClose);

function handleFormSubmit(evt) { 
    evt.preventDefault();
    fullName.textContent = newFullName.value; 
    career.textContent = newCareer.value;
    openPopupOrClose();
}
let popupContainer = document.querySelector(".popup__input-container")
popupContainer.addEventListener('submit', handleFormSubmit); 
 

