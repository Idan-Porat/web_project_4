import "./index.css"
import { initialCards } from "../../src/components/initial-cards.js";
import Card from '../../src/components/Card.js';
import PopupWithImage from '../../src/components/PopupWithImage.js';
import PopupWithForm from '../../src/components/PopupWithForm.js';
import Section from '../../src/components/Section.js';
import UserInfo from '../../src/components/UserInfo.js';
import { closePopup, openPopup, editForm, editValidator, newPhotoTitle, newPhotoUrl, addValidator, inputName, inputCareer } from '../../src/components/utilities.js';


const fullName = document.querySelector('.profile__full-name');
const career = document.querySelector('.profile__career');
const openEditProfilePopupBtn = document.querySelector('.profile__button');
const openAddCardPopupBtn = document.querySelector('.profile__rectangle');
const closeEditForm = editForm.querySelector('.popup__close-button');
const popupPhoto = document.querySelector(".popup_theme_open-photo");
const closePopupImage = popupPhoto.querySelector('.popup__close-button');
const addPhotoForm = document.querySelector(".popup_theme_add-photo");
const closeAddPhotoForm = addPhotoForm.querySelector('.popup__close-button');
const elementsContainer = document.querySelector(".elements__container");


addValidator.enableValidation();
editValidator.enableValidation();


const userInfo = new UserInfo({ nameSelector: '.profile__full-name', carrerSelector: '.profile__career' });

function openPopupEdit() {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputCareer.value = userData.carrer;

  editValidator.resetValidation();

  openPopup(editForm);
}

closeEditForm.addEventListener("click", () => closePopup(editForm));

closeAddPhotoForm.addEventListener("click", () => closePopup(addPhotoForm));

closePopupImage.addEventListener("click", () => closePopup(popupPhoto));

openEditProfilePopupBtn.addEventListener("click", openPopupEdit);

openAddCardPopupBtn.addEventListener("click", handleAddPhotoClick);


function handleAddPhotoClick() {
  newPhotoTitle.value = "";
  newPhotoUrl.value = "";
  addValidator.resetValidation();
  openPopup(addPhotoForm);
}

editForm.addEventListener('submit', submitProfileForm);

function submitProfileForm(evt) {
  evt.preventDefault();
  fullName.textContent = inputName.value;
  career.textContent = inputCareer.value;
  closePopup(editForm);
}

addPhotoForm.addEventListener('submit', createNewCard);

const imagePopupModal = new PopupWithImage(".popup_theme_open-photo");


function createNewCard(cardData, template) {
  const cardInstance = new Card( {name: newPhotoTitle.value, link: newPhotoUrl.value} , "#elements__template",
  () => imagePopupModal.openPopup( {name: newPhotoTitle.value, link: newPhotoUrl.value} ));
  const cardElement = cardInstance.generateCard();
  elementsContainer.prepend(cardElement);
  cardList.addItem(cardElement);
  closePopup(addPhotoForm);
}

const cardList = new Section({
  renderer: (item) => {
    const card = createNewCard(item, "#elements__template");

    cardList.addItem(card);
  }
}, ".elements__container");



initialCards.forEach(cardData => {
  const cardInstance = new Card(cardData, "#elements__template", 
  () => imagePopupModal.openPopup(cardData));
  const cardElement = cardInstance.generateCard();
  cardList.addItem(cardElement);
  elementsContainer.prepend(cardElement);
})

imagePopupModal.setEventListeners();


