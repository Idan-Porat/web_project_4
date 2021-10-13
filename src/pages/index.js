import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from "../initial-cards.js";


const fullName = document.querySelector('.profile__full-name');
const career = document.querySelector('.profile__career');
const openEditProfilePopupBtn = document.querySelector('.profile__button');
const openAddCardPopupBtn = document.querySelector('.profile__rectangle');

const inputName = document.querySelector('.popup__item_type_name');
const inputCareer = document.querySelector('.popup__item_type_career');
const newPhotoTitle = document.querySelector('.popup__item_type_photo-title');
const newPhotoUrl = document.querySelector('.popup__item_type_url');

const editForm = document.querySelector(".popup_theme_edit");
const closeEditForm = editForm.querySelector('.popup__close-button');
const popupPhoto = document.querySelector(".popup_theme_open-photo");
const closePopupImage = popupPhoto.querySelector('.popup__close-button');
const addPhotoForm = document.querySelector(".popup_theme_add-photo");
const closeAddPhotoForm = addPhotoForm.querySelector('.popup__close-button');

const popup = document.querySelector(".popup");
const popupContainer = document.querySelector('.popup__container');
const popupImage = popupPhoto.querySelector(".popup__open-image");
const popupOpenImageCaption = document.querySelector(".popup__open-image-caption");


const elementsTemplate = document.querySelector("#elements__template").content;
const elementsContainer = document.querySelector(".elements__container");
const popupInputContainer = document.querySelector(".popup__input-container");
const cardImage = document.querySelectorAll(".elements__pic");


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

const editValidator = new FormValidator(config, editForm);
const addValidator = new FormValidator(config, addPhotoForm);

addValidator.enableValidation();
editValidator.enableValidation();

function openPopup(popup) {
  document.addEventListener("keydown", closeOverlayByEsc);
  popup.addEventListener("click", addRemoteClickListeners);
  popup.classList.add('popup_open');
}


function closePopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener("keydown", closeOverlayByEsc);
  popup.removeEventListener("click", addRemoteClickListeners);
}


const addRemoteClickListeners = () => {
  const formList = Array.from(document.querySelectorAll(".popup"));
  formList.forEach((formElement) => {
    formElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("popup_open")) {
        closePopup(formElement);
      }
    });
  });
}
addRemoteClickListeners();

const closeOverlayByEsc = () => {
  const formList = Array.from(document.querySelectorAll(".popup"));
  formList.forEach((formElement) => {
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        closePopup(formElement);
      }
    });
  });
}
closeOverlayByEsc();

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

export { popupImage, popupPhoto, popupOpenImageCaption, openPopup }