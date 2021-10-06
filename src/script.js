import Card from "./Card.js";

const fullName = document.querySelector('.profile__full-name');
const career = document.querySelector('.profile__career');
const openEditProfilePopupBtn = document.querySelector('.profile__button');
const openAddCardPopupBtn = document.querySelector('.profile__rectangle');


const inputName = document.querySelector('.popup__item_type_name');
const inputCareer = document.querySelector('.popup__item_type_career');
const newPhotoTitle = document.querySelector('.popup__item_type_photo-title');
const newPhotoUrl = document.querySelector('.popup__item_type_url');


const popup = document.querySelector(".popup");
const editForm = document.querySelector(".popup_theme_edit");
const closeEditForm = editForm.querySelector('.popup__close-button');
export const popupPhoto = document.querySelector(".popup_theme_open-photo");
export const closePopupImage = popupPhoto.querySelector('.popup__close-button');
const addPhotoForm = document.querySelector(".popup_theme_add-photo");
const closeAddPhotoForm = addPhotoForm.querySelector('.popup__close-button');
const popupContainer = document.querySelector('.popup__container');
export const popupImage = popupPhoto.querySelector(".popup__open-image");
export const popupOpenImageCaption = document.querySelector(".popup__open-image-caption");


export const elementsTemplate = document.querySelector("#elements__template").content;
export const card = elementsTemplate.querySelector(".elements__card").cloneNode(true);
export const elementsContainer = document.querySelector(".elements__container");
const popupInputContainer = document.querySelector(".popup__input-container");
export const elementPic = document.querySelector(".elements__pic");
export const elementTitle = document.querySelector(".elements__title");
export const deleteButton = document.querySelector(".elements__delete-button");
export const likeButton = document.querySelector(".elements__like-button");


export function openPopup(popup) {
  popup.classList.add("popup_open");
}

export function closePopup(popup) {
  if (!(popupPhoto.classList.contains("popup_open"))) {
    popup.classList.remove("popup_open");
    resetPopup(popup);
  } else {
    popup.classList.remove("popup_open");
  }
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
  openPopup(editForm);
}

openAddCardPopupBtn.addEventListener("click", addNewPhoto);

function addNewPhoto() {
  newPhotoTitle.value = "";
  newPhotoUrl.value = "";
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
  const cardInstance = new Card({name: newPhotoTitle.value, link: newPhotoUrl.value}, "#elements__template");
  const cardElement = cardInstance.generateCard();
  elementsContainer.prepend(cardElement);
  closePopup(addPhotoForm);
}





