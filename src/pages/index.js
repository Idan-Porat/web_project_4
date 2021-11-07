import { initialCards } from "../../src/components/initial-cards.js";
import Card from '../../src/components/Card.js';
import FormValidator from '../../src/components/FormValidator.js';
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


const config = {
  formSelector: ".popup",
  inputSelectorSet: ".popup__set",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__item-error",
  errorClass: "popup__item-error_active",
  errorInputSelector: "popup__item_theme_red"
};


addValidator.enableValidation();
editValidator.enableValidation();


const userInfo = new UserInfo({ nameSelector: '.profile__full-name', carrerSelector: '.profile__career' });

function openPopupEdit() {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputCarrer.value = userData.carrer;

  editValidator.resetValidation();

  openPopup(popupEdit);
}

closeEditForm.addEventListener("click", () => closePopup(editForm));

closeAddPhotoForm.addEventListener("click", () => closePopup(addPhotoForm));

closePopupImage.addEventListener("click", () => closePopup(popupPhoto));

openEditProfilePopupBtn.addEventListener("click", editprofile);

function editprofile() {
  const newFullNameVal = fullName.textContent;
  const newCareerVal = career.textContent;
  inputName.value = newFullNameVal;
  inputCareer.value = newCareerVal;
  editValidator.resetValidation();
  openPopup(editForm);
}

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

addPhotoForm.addEventListener('submit', submitAddPhotoForm);

function submitAddPhotoForm(evt) {
  evt.preventDefault();
  const cardInstance = new Card({ name: newPhotoTitle.value, link: newPhotoUrl.value }, "#elements__template");
  const cardElement = cardInstance.generateCard();
  elementsContainer.prepend(cardElement);
  closePopup(addPhotoForm);
}

initialCards.forEach(cardData => {
  const cardInstance = new Card(cardData, "#elements__template");
  const cardElement = cardInstance.generateCard();
  elementsContainer.prepend(cardElement);
})

