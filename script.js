function openPopup() {
    let fullName = document.querySelector('.profile__full-name');
    let career = document.querySelector('.profile__career');
    let newFullName = document.querySelector('.popup__item_name');
    let newCareer = document.querySelector('.popup__item_about');
    newFullName.value = fullName.textContent;
    newCareer.value = career.textContent;
    document.querySelector(".overlay").style.display = "block";
    document.querySelector(".popup").style.display = "flex";
}


function closePopup() {
  let fullName = document.querySelector('.profile__full-name');
  let career = document.querySelector('.profile__career');
  let newFullName = document.querySelector('.popup__item_name');
  let newCareer = document.querySelector('.popup__item_about');  
  newFullName.value = fullName.textContent;
  newCareer.value = career.textContent;
  document.querySelector(".overlay").style.display = "none";
  document.querySelector(".popup").style.display = "none";
}

let open = document.querySelector('.profile__button');
let close = document.querySelector('.popup__close-button');
open.addEventListener("click", openPopup);
close.addEventListener("click", closePopup);

// Let's find the form in the DOM
let popupElement = document.querySelector('.popup')

  // Next is the form submit handler, though
  // it won't submit anywhere just yet
  function handleFormSubmit(evt) {
    evt.preventDefault(); // This line stops the browser from submitting the form in the default way.
    // Having done so, we can define our own way of submitting the form.
    // We'll explain it in more detail later.

    // Let's find the form fields in the DOM
    let nameInput = document.querySelector('.popup__item_name');
    let jobInput = document.querySelector('.popup__item_about');
    // Get the values of each field from the corresponding value property
    let fullName = document.querySelector('.profile__full-name');
    let career = document.querySelector('.profile__career');
    // Select elements where the field values will be entered
    fullName.textContent = nameInput.value;
    career.textContent = jobInput.value;
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".popup").style.display = "none";
    // Insert new values using the textContent property of the querySelector() method
  }

// Connect the handler to the form:
// it will watch the submit event
let changeText = document.querySelector('.popup');
changeText.addEventListener('submit', handleFormSubmit);
