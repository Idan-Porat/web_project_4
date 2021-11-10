import "./index.css"
import { initialCards } from "../utils/initial-cards.js";
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupPhotoForm from '../components/PopupPhotoForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { closePopup, openPopup, editForm, editValidator, newPhotoTitle, newPhotoUrl, addValidator, inputName, inputCareer, popupConfig, profileConfig } from '../utils/utilities.js';

const openEditProfilePopupBtn = document.querySelector('.profile__button');
const openAddCardPopupBtn = document.querySelector('.profile__rectangle');
const addPhotoForm = document.querySelector(".popup_theme_add-photo");
const elementsContainer = document.querySelector(".elements__container");
const elementTemplate = "#elements__template";

addValidator.enableValidation();
editValidator.enableValidation();

const userInfo = new UserInfo({ nameSelector: profileConfig.profileTitle, carrerSelector: profileConfig.profileDescription });

function openPopupEdit() {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputCareer.value = userData.carrer;

  editValidator.resetValidation();

  openPopup(editForm);
}

openEditProfilePopupBtn.addEventListener("click", openPopupEdit);

openAddCardPopupBtn.addEventListener("click", handleAddPhotoClick);


function handleAddPhotoClick() {
  newPhotoTitle.value = "";
  newPhotoUrl.value = "";
  addValidator.resetValidation();
  openPopup(addPhotoForm);
}

editForm.addEventListener('submit', submitProfileForm);

function submitProfileForm() {
  userInfo.setUserInfo({ fullName: inputName.value, carrer: inputCareer.value });
  closePopup(editForm);
}

addPhotoForm.addEventListener('submit', createNewCard);

const imagePopupModal = new PopupWithImage(popupConfig.imageModalWindow);
const editProfilePopup = new PopupWithForm(popupConfig.editModalWindow, submitProfileForm);
const addPhotoPopup = new PopupPhotoForm(popupConfig.addPhotoModalWindow, createNewCard);

function createNewCard() {
  const cardInstance = new Card({ name: newPhotoTitle.value, link: newPhotoUrl.value }, elementTemplate,
    () => imagePopupModal.openPopup({ name: newPhotoTitle.value, link: newPhotoUrl.value }));
  const cardElement = cardInstance.generateCard();
  cardList.addItem(cardElement);
  closePopup(addPhotoForm);
}

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const cardInstance = new Card(item, "#elements__template",
      () => imagePopupModal.openPopup(item));
    const cardElement = cardInstance.generateCard();
    cardList.addItem(cardElement);
  }
}, popupConfig.elementsContainer);


cardList.renderItems();


imagePopupModal.setEventListeners();
editProfilePopup.setEventListeners();
addPhotoPopup.setEventListeners();

