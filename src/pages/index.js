import "./index.css"
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupForDeleteCard from '../components/PopupForDeleteCard.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { closePopup, openPopup } from '../utils/utilities.js';
import { elementSelectorTemplate, editPopupAvatar, addPhotoForm, openEditAvatarPopupBtn, openAddCardPopupBtn, openEditProfilePopupBtn, editForm, editAvatarForm, editValidator, avatarValidator, newPhotoTitle, newPhotoUrl, inputAvatar, addValidator, inputName, inputCareer, popupConfig, profileConfig } from '../utils/constants.js';
import Api from '../components/Api.js';

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
    userInfo.setUserInfo({ fullName: userData.name, career: userData.about });
    userInfo.setUserAvatar(userData.avatar);
    userId = userData._id;
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });



addValidator.enableValidation();
editValidator.enableValidation();
avatarValidator.enableValidation();

const userInfo = new UserInfo({ nameSelector: profileConfig.profileTitle, careerSelector: profileConfig.profileDescription, avatarSelector: profileConfig.avatarImage });

function openPopupEdit() {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputCareer.value = userData.career;

  editValidator.resetValidation();

  editProfilePopup.openPopup();
}

function openPopupEditAvatar() {
  const userData = userInfo.getUserInfo();
  inputAvatar.value = userData.avatar;

  avatarValidator.resetValidation();

  editAvatarPhotoPopup.openPopup();
}


openEditProfilePopupBtn.addEventListener("click", openPopupEdit);
openAddCardPopupBtn.addEventListener("click", handleAddPhotoClick);
openEditAvatarPopupBtn.addEventListener("click", openPopupEditAvatar);

function handleAddPhotoClick() {
  addValidator.resetValidation();
  addPhotoPopup.openPopup();
}

const imagePopupModal = new PopupWithImage(popupConfig.imageModalWindow);
const deleteCardModal = new PopupForDeleteCard(popupConfig.deleteCardModalWindow);
const editProfilePopup = new PopupWithForm(popupConfig.editModalWindow, (inputValues) => {
  editProfilePopup.showLoadingProgress();
  api.setUserInfo({ name: inputValues.fullName, about: inputValues.career })
    .then(res => {
      userInfo.setUserInfo({ fullName: res.name, career: res.about })

      editProfilePopup.closePopup();
    })
    .catch((err) => {
      console.log(err); // log the error to the console
    })
    .finally(() => editProfilePopup.onLoadFinish());
});

const addPhotoPopup = new PopupWithForm(popupConfig.addPhotoModalWindow, (inputValues) => {
  addPhotoPopup.showLoadingProgress();
  api.createNewCard({name: inputValues.title, link: inputValues.link})
    .then(res => {
      const newCard = createNewCard(res, elementSelectorTemplate)

      cardList.addItem(newCard);
      addPhotoPopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => addPhotoPopup.onLoadFinish());
});
const editAvatarPhotoPopup = new PopupWithForm(popupConfig.editAvatarModalWindow, (inputValues) => {
  editAvatarPhotoPopup.showLoadingProgress();
  api.setUserImage(inputValues.image)
    .then(res => {
      userInfo.setUserAvatar(res.avatar)

      editAvatarPhotoPopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => editAvatarPhotoPopup.onLoadFinish());
});




function createNewCard(item, elementSelectorTemplate) {
  const cardInstance = new Card(item, elementSelectorTemplate,
    () => imagePopupModal.openPopup(item), (id) => {
      deleteCardModal.openPopup();

      deleteCardModal.setAction(() => {
        api.deleteCard(id)
          .then(() => {
            cardInstance.removeCard();
            deleteCardModal.closePopup();
          })
          .catch((err) => {
            console.log(err);
          });
      })
    }
    , (id) => {
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
    const card = createNewCard(item, elementSelectorTemplate);

    cardList.addItem(card);
  }
}, popupConfig.elementsContainer);


imagePopupModal.setEventListeners();
editProfilePopup.setEventListeners();
addPhotoPopup.setEventListeners();
editAvatarPhotoPopup.setEventListeners();
deleteCardModal.setEventListeners();
