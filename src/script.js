
const fullName = document.querySelector('.profile__full-name');
const career = document.querySelector('.profile__career');
const openEditProfilePopupBtn = document.querySelector('.profile__button');
const openAddCardPopupBtn  = document.querySelector('.profile__rectangle');

const inputName = document.querySelector('.popup__item_type_name');
const inputCareer = document.querySelector('.popup__item_type_career');
const newPhotoTitle = document.querySelector('.popup__item_type_photo-title');
const newPhotoUrl = document.querySelector('.popup__item_type_url');

const popup = document.querySelector(".popup");
const editForm = document.querySelector(".popup_theme_edit");
const closeEditForm = editForm.querySelector('.popup__close-button');
const popupPhoto = document.querySelector(".popup_theme_open-photo");
const closePopupImage = popupPhoto.querySelector('.popup__close-button');
const addPhotoForm = document.querySelector(".popup_theme_add-photo");
const closeAddPhotoForm = addPhotoForm.querySelector('.popup__close-button');
const popupContainer = document.querySelector('.popup__container');
const popupImage = popupPhoto.querySelector(".popup__open-image");
const popupOpenImageCaption = document.querySelector(".popup__open-image-caption");


const elementsTemplate = document.querySelector("#elements__template").content;
const elementsContainer = document.querySelector(".elements__container");
const popupInputContainer = document.querySelector(".popup__input-container");
const cardImage = document.querySelectorAll(".elements__pic");
const likeButton = document.querySelector(".elements__like-button");


function openPopup(popup) {
  popup.classList.add("popup_open");
}

function closePopup(popup) {
  popup.classList.remove("popup_open");
}



closeEditForm.addEventListener("click", () => closePopup(editForm));

closeAddPhotoForm.addEventListener("click", () => closePopup(addPhotoForm))

closePopupImage.addEventListener("click", () => closePopup(popupPhoto));

openEditProfilePopupBtn.addEventListener("click", function editprofile() {
  const newFullNameVal = fullName.textContent;
  const newCareerVal = career.textContent;
  inputName.value = newFullNameVal;
  inputCareer.value = newCareerVal;
  openPopup(editForm);
});

openAddCardPopupBtn.addEventListener("click", function addNewPhoto() {
  newPhotoTitle.value = "";
  newPhotoUrl.value = "";
  openPopup(addPhotoForm);
});

editForm.addEventListener('submit', function submitProfileForm(evt) {
  evt.preventDefault();
  fullName.textContent = inputName.value;
  career.textContent = inputCareer.value;
  closePopup(editForm);
});

addPhotoForm.addEventListener('submit', function submitAddPhotoForm(evt) {
  evt.preventDefault();
  addElementCard({name:newPhotoTitle.value, link:newPhotoUrl.value});
  closePopup(addPhotoForm);
});

function addElementCard(item) {
  const card = elementsTemplate.querySelector(".elements__card").cloneNode(true);
  elementsContainer.prepend(createCard(card, item));
}

function createCard(card ,item) {
  const elementPic = card.querySelector(".elements__pic");
  const elementTitle = card.querySelector(".elements__title");
  const deleteButton = card.querySelector(".elements__delete-button");
  const likeButton = card.querySelector(".elements__like-button");
  elementPic.style.backgroundImage = `url(${item.link})`;
  elementTitle.textContent = item.name;

  likeButton.addEventListener("click", handleLikeBtnClick);

  function handleLikeBtnClick() {
    likeButton.classList.toggle("elements__like-button_active");
  }
  
  function removeCard() {
    card.remove();
  }
  deleteButton.addEventListener("click", removeCard);

  elementPic.addEventListener("click" ,() => { 
      openPopup(popupPhoto);
      popupImage.src = item.link;
      popupImage.alt = item.name;
      popupOpenImageCaption.textContent = item.name;
  }); 
  return card;
}

initialCards.forEach(addElementCard);










  




 





