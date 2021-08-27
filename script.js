let fullName = document.querySelector('.profile__full-name');
let career = document.querySelector('.profile__career');
let newFullName = document.querySelector('.popup__item_type_name');
let newCareer = document.querySelector('.popup__item_type_about');
let newImageTitle = document.querySelector('popup__item_type_image_title');
let newImageUrl = document.querySelector('popup__item_type_image_url');

let popup = document.querySelector(".popup");
let popupClose = document.querySelector(".popup__close-button");
let elementsContainer = document.querySelector(".elements__container");


function popupTemplate() {
  const popupContainer = document.querySelector('.popup__container');
  if (!EditClick.click) {
    popupContainer.querySelector(".popup__header").textContent = "Edit profile";
    popupContainer.querySelector(".popup__button").textContent = "Save";
    popupContainer.querySelector(".popup__item_type_name").placeholder = "Name";
    popupContainer.querySelector(".popup__item_type_about").placeholder = "About me";
    const newFullNameVal = fullName.textContent;
    const newCareerVal = career.textContent;
    newFullName.value = newFullNameVal;
    newCareer.value = newCareerVal;
  } else {
    popupContainer.querySelector(".popup__header").textContent = "New Photo";
    popupContainer.querySelector(".popup__button").textContent = "Create";
    popupContainer.querySelector(".popup__item_type_name").placeholder = "Title";
    popupContainer.querySelector(".popup__item_type_about").placeholder = "Image URL";
  }
}

let EditClick = document.querySelector('.profile__button');
let closePopupClick = document.querySelector('.popup__close-button');
let addPhoto = document.querySelector('.profile__rectangle');

EditClick.addEventListener("click", function editprofile() {
  const popupContainer = document.querySelector('.popup__container');
  popupContainer.querySelector(".popup__header").textContent = "Edit profile";
  popupContainer.querySelector(".popup__button").textContent = "Save";
  popupContainer.querySelector(".popup__item_type_name").placeholder = "Name";
  popupContainer.querySelector(".popup__item_type_about").placeholder = "About me";
  const newFullNameVal = fullName.textContent;
  const newCareerVal = career.textContent;
  newFullName.value = newFullNameVal;
  newCareer.value = newCareerVal;
  popup.classList.add("popup_open");
});

addPhoto.addEventListener("click", function addNewPhoto() {
  const popupContainer = document.querySelector('.popup__container');
  popupContainer.querySelector(".popup__header").textContent = "New Photo";
  popupContainer.querySelector(".popup__button").textContent = "Create";
  popupContainer.querySelector(".popup__item_type_name").placeholder = "Title";
  popupContainer.querySelector(".popup__item_type_about").placeholder = "Image URL";
  newFullName.value = "";
  newCareer.value = "";
  popup.classList.add("popup_open");
});

closePopupClick.addEventListener("click", closePopup);

function closePopup() {
  popup.classList.remove("popup_open");
}

let popupContainer = document.querySelector(".popup__input-container");
popupContainer.addEventListener('submit', function saveProfileOrAddNewCard(evt) {
  evt.preventDefault();
  if (!(popupContainer.querySelector(".popup__item_type_name").placeholder == "Title")) {
    fullName.textContent = newFullName.value;
    career.textContent = newCareer.value;
    closePopup();
  } else {
    addNewCard(newFullName.value, newCareer.value);
    likebutton();
    closePopup();
  }
});

function addNewCard(cardTitle, urlImage) {
  const newCard = { name: cardTitle, link: urlImage};
  initialCards.push(newCard);
  const elementsTemplate = document.querySelector("#elements__template").content;
  const cardElement = elementsTemplate.querySelector('.elements__card').cloneNode(true);
  cardElement.querySelector(".elements__pic").src = newCard.link;
  cardElement.querySelector(".elements__title").alt = newCard.name;
  cardElement.querySelector(".elements__title").textContent = newCard.name;
  elementsContainer.prepend(cardElement);
}


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
  
  initialCards.forEach((card) => {
    const cardElement = elementsTemplate.querySelector('.elements__card').cloneNode(true);
    cardElement.querySelector(".elements__pic").src = card.link;
    cardElement.querySelector(".elements__pic").alt = card.name;
    cardElement.querySelector(".elements__title").textContent = card.name;
    elementsContainer.append(cardElement);
  });
}
addElementCard();
likebutton();

function likebutton() {
  let likeButtons = document.querySelectorAll(".elements__like-button"); 
 
  function likeFunction(likeButton) { 
    likeButton.classList.toggle("elements__like-button_active"); 
  } 
 
  for (let i = 0; i < likeButtons.length; i++) { 
    likeButtons[i].addEventListener("click", () => likeFunction(likeButtons[i])); 
  } 
}

 





