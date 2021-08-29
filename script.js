const initialCards = [
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
  },
  {
    name: "New York",
    link: "https://images.unsplash.com/photo-1466500419182-8602dc906b51?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80.jpg"
  },
];

const fullName = document.querySelector('.profile__full-name');
const career = document.querySelector('.profile__career');
const editClick = document.querySelector('.profile__button');
const addPhoto = document.querySelector('.profile__rectangle');

const newFullName = document.querySelector('.popup__item_type_name');
const newCareer = document.querySelector('.popup__item_type_about');

const popup = document.querySelector(".popup");
const popupThemeOpenPhoto = document.querySelector(".popup_theme_open-photo");
const closePopupImage = popupThemeOpenPhoto.querySelector('.popup__close-button');
const popupContainer = document.querySelector('.popup__container');
const editOrAddPhotoForms = document.querySelector(".popup_theme_edit-or-add-photo");
const closePopupForm = editOrAddPhotoForms.querySelector('.popup__close-button');
const popupImage = document.querySelector(".popup__open-image");
const popupOpenImageCaption = document.querySelector(".popup__open-image-caption");

const elementsTemplate = document.querySelector("#elements__template").content;
const elementsContainer = document.querySelector(".elements__container");
const popupInputContainer = document.querySelector(".popup__input-container");
const card = document.querySelector(".elements__card");
const cardImage = document.querySelectorAll(".elements__pic");
const likeButton = document.querySelector(".elements__like-button");




function closePopup(closePop) {
  closePop.classList.remove("popup_open");
}

closePopupForm.addEventListener("click", () => closePopup(editOrAddPhotoForms));

closePopupImage.addEventListener("click", () => closePopup(popupThemeOpenPhoto));

editClick.addEventListener("click", function editprofile() {
  popupContainer.querySelector(".popup__header").textContent = "Edit profile";
  popupContainer.querySelector(".popup__button").textContent = "Save";
  popupContainer.querySelector(".popup__item_type_name").placeholder = "Name";
  popupContainer.querySelector(".popup__item_type_about").placeholder = "About me";
  const newFullNameVal = fullName.textContent;
  const newCareerVal = career.textContent;
  newFullName.value = newFullNameVal;
  newCareer.value = newCareerVal;
  editOrAddPhotoForms.classList.add("popup_open");
});

addPhoto.addEventListener("click", function addNewPhoto() {
  popupContainer.querySelector(".popup__header").textContent = "New Photo";
  popupContainer.querySelector(".popup__button").textContent = "Create";
  popupContainer.querySelector(".popup__item_type_name").placeholder = "Title";
  popupContainer.querySelector(".popup__item_type_about").placeholder = "Image URL";
  newFullName.value = "";
  newCareer.value = "";
  editOrAddPhotoForms.classList.add("popup_open");
});


popupContainer.addEventListener('submit', function saveProfileOrAddNewCard(evt) {
  evt.preventDefault();
  if (!(popupContainer.querySelector(".popup__item_type_name").placeholder == "Title")) {
    fullName.textContent = newFullName.value;
    career.textContent = newCareer.value;
    closePopup(editOrAddPhotoForms);
  } else {
    addElementCard({name:newFullName.value, link:newCareer.value});
    closePopup(editOrAddPhotoForms);
  }
});



function addElementCard(item) {
  let card = elementsTemplate.querySelector(".elements__card").cloneNode(true);
  const elementPic = card.querySelector(".elements__pic");
  const elementTitle = card.querySelector(".elements__title");
  const deleteButton = card.querySelector(".elements__delete-button");
  const likeButton = card.querySelector(".elements__like-button");
  function handleLikeBtnClick() {
    likeButton.classList.toggle("cards__heart-like_full");
  }
  
  elementPic.style.backgroundImage = `url(${item.link})`;
  elementTitle.textContent = item.name;
  likeButton.addEventListener("click", handleLikeBtnClick);

  function handleLikeBtnClick() {
    likeButton.classList.toggle("elements__like-button_active");
  }

  function removeCard() {
    card.remove();
    card = null;
  }

  deleteButton.addEventListener("click", removeCard);

  elementPic.addEventListener("click" ,() => { 
      popupThemeOpenPhoto.classList.add("popup_open");
      popupThemeOpenPhoto.querySelector(".popup__open-image").src = item.link;
      popupThemeOpenPhoto.querySelector(".popup__open-image").alt = item.name;
      popupOpenImageCaption.textContent = item.name;
  }); 
  elementsContainer.prepend(card);
}

initialCards.forEach(addElementCard);









  




 





