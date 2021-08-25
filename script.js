let fullName = document.querySelector('.profile__full-name');
let career = document.querySelector('.profile__career');
let newFullName = document.querySelector('.popup__item_type_name');
let newCareer = document.querySelector('.popup__item_type_about');
let popup = document.querySelector(".popup");
let popupClose = document.querySelector(".popup__close-button");
let elementsContainer = document.querySelector(".elements__container");

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

const initialCards = [
  {
    name: "New York",
    link: "https://images.unsplash.com/photo-1466500419182-8602dc906b51?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80.jpg"
  },
  {
    name: "Tunnel view, California",
    link: "https://images.unsplash.com/photo-1604947338354-426e7a15586d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80.jpg"
  },
  {
    name: "Kauai beach drive, lihue",
    link: "https://images.unsplash.com/photo-1496155110490-cdcc48eba923?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1191&q=80.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
]; 

function addElementCard() {
  const elementsTemplate = document.querySelector("#elements__template").content;

  initialCards.forEach ((item) => {
  const cardElement = elementsTemplate.querySelector('.elements__card').cloneNode(true);  
  cardElement.querySelector(".elements__pic").src = item.link;
  cardElement.querySelector(".elements__title").textContent = item.name;
  elementsContainer.append(cardElement);
  });
}
addElementCard();


 

