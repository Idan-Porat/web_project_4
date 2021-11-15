import "./index.css"
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { deleteCardBtn, closePopup, openPopup, editForm, editAvatarForm, editValidator, avatarValidator, newPhotoTitle, newPhotoUrl, inputAvatar, addValidator, inputName, inputCareer, popupConfig, profileConfig } from '../utils/utilities.js';
import Api from '../components/Api.js';
import PopupForDeleteCard from "../components/PopupForDeleteCard";

const api = new Api({
  baseURL: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "001651b9-e63d-4f3d-8d65-ab968b3111ee",
    "Content-Type": "application/json"
  }
});

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    userInfo.setUserInfo({ fullName: userData.name, carrer: userData.about });
    userInfo.setUserAvatar(userData.avatar);
    userId = userData._id;
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });

const openEditProfilePopupBtn = document.querySelector('.profile__button');
const openAddCardPopupBtn = document.querySelector('.profile__rectangle');
const openEditAvatarPopupBtn = document.querySelector('.avatar__edit');
const addPhotoForm = document.querySelector(".popup_theme_add-photo");
const editPopupAvatar = document.querySelector(".popup_theme_edit-avatar");
const elementTemplate = "#elements__template";

addValidator.enableValidation();
editValidator.enableValidation();
avatarValidator.enableValidation();

const userInfo = new UserInfo({ nameSelector: profileConfig.profileTitle, carrerSelector: profileConfig.profileDescription, avatarSelector: profileConfig.avatarImage });

function openPopupEdit() {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputCareer.value = userData.carrer;

  editValidator.resetValidation();

  openPopup(editForm);
}

function openPopupEditAvatar() {
  const userData = userInfo.getUserInfo();
  inputAvatar.value = userData.avatar;

  avatarValidator.resetValidation();

  openPopup(editAvatarForm);
}


openEditProfilePopupBtn.addEventListener("click", openPopupEdit);
openAddCardPopupBtn.addEventListener("click", handleAddPhotoClick);
openEditAvatarPopupBtn.addEventListener("click", openPopupEditAvatar);

function handleAddPhotoClick() {
  newPhotoTitle.value = "";
  newPhotoUrl.value = "";
  addValidator.resetValidation();
  openPopup(addPhotoForm);
}

const imagePopupModal = new PopupWithImage(popupConfig.imageModalWindow);
const deleteCardModal = new PopupForDeleteCard(popupConfig.deleteCardModalWindow);
const editProfilePopup = new PopupWithForm(popupConfig.editModalWindow, () => {
  editProfilePopup.showLoadingProgress();
  api.setUserInfo({ name: inputName.value, about: inputCareer.value })
    .then(res => {
      userInfo.setUserInfo({ fullName: res.name, carrer: res.about })

      closePopup(editForm);
    })
    .catch((err) => {
      console.log(err); // log the error to the console
    })
    .finally(() => editProfilePopup.onLoadFinish());
});

const addPhotoPopup = new PopupWithForm(popupConfig.addPhotoModalWindow, () => {
  addPhotoPopup.showLoadingProgress();
  api.createNewCard({ name: newPhotoTitle.value, link: newPhotoUrl.value })
    .then(res => {
      const newCard = createNewCard(res, elementTemplate)

      cardList.addItem(newCard);
      closePopup(addPhotoForm);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => addPhotoPopup.onLoadFinish());
});
const editAvatarPhotoPopup = new PopupWithForm(popupConfig.editAvatarModalWindow, () => {
  editAvatarPhotoPopup.showLoadingProgress();
  api.setUserImage(inputAvatar.value)
    .then(res => {
      userInfo.setUserAvatar(res.avatar)

      closePopup(editPopupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => editAvatarPhotoPopup.onLoadFinish());
});




function createNewCard(item, elementTemplate) {
  const cardInstance = new Card(item, elementTemplate,
    () => imagePopupModal.openPopup(item),  (id) => {
      deleteCardModal.openPopup();

      deleteCardModal.setAction(() => {
        api.deleteCard(id)
          .then(() => {
            cardInstance._removeCard();
            deleteCardModal.closePopup();
          })
          .catch((err) => {
            console.log(err);
          });
      })
    }
    ,(id) => {
      if (!cardInstance.isLikedByUser()) {
        api.likeCard(id)
          .then((res) => cardInstance.counterLikes(res.likes))
          .catch((err) => {
            console.log(err);
          });
      }
      else {
        api.unlikeCard(id)
          .then((res) => cardInstance.counterLikes(res.likes))
          .catch((err) => {
            console.log(err);
          });
      }
    }, userId);
    
    return cardInstance.generateCard();
}
const cardList = new Section({
  renderer: (item) => {
    const card = createNewCard(item, elementTemplate);

    cardList.addItem(card);
  }
}, popupConfig.elementsContainer);


imagePopupModal.setEventListeners();
editProfilePopup.setEventListeners();
addPhotoPopup.setEventListeners();
editAvatarPhotoPopup.setEventListeners();
deleteCardModal.setEventListeners();
