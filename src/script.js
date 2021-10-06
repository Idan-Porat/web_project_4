import Card from "./Card.js";
import FormValidator from './FormValidator.js';


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
const elementsContainer = document.querySelector(".elements__container");


const configs = {
  formSelector: ".popup",
  inputSelectorSet: ".popup__set",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__item-error",
  errorClass: "popup__item-error_active",
  errorInputSelector: "popup__item_theme_red"
};

const editValidator = new FormValidator(configs, editForm);
const addValidator = new FormValidator(configs, addPhotoForm);

addValidator._enableValidation();
editValidator._enableValidation();

function openEditForm(popup) {
  inputName.value = "";
  inputCareer.value = "";
  editValidator._resetPopup();
  popup.classList.add("popup_open");
}

function openNewPhotoForm(popup) {
  newPhotoTitle.value = "";
  newPhotoUrl.value = "";
  addValidator._resetPopup();
  popup.classList.add("popup_open");
}

function closePopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener("keydown", closeOverlayByEsc);
  popup.removeEventListener("click", closeOverlayByClick);
}


const closeOverlayByClick = () => {
  const formList = Array.from(document.querySelectorAll(".popup"));
  formList.forEach((formElement) => {
    formElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("popup_open")) {
        closePopup(formElement);
      }
    });
  });
}
closeOverlayByClick();

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
  openEditForm(editForm);
}

openAddCardPopupBtn.addEventListener("click", addNewPhoto);

function addNewPhoto() {
  newPhotoTitle.value = "";
  newPhotoUrl.value = "";
  openNewPhotoForm(addPhotoForm);
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







