class Card {
    constructor(data, template, handleCardClick, handleDelete, handleLike, userId) {
        this._title = data.name;
        this._image = data.link;
        this._template = template;
        this._handleCardClick = handleCardClick;
        this._handleDelete = handleDelete;
        this._userId = userId;
        this._handleLike = handleLike;
        this._id = data._id;
        this._likes = data.likes;
        this._ownerId = data.owner._id;
        this._userId = userId;

        this._cardTemplate = document
            .querySelector(this._template).content
            .querySelector(".elements__card");
    }


    generateCard() {
        this._element = this._cardTemplate.cloneNode(true);

        this._setEventListeners();

        this._element.querySelector(".elements__pic").style.backgroundImage = `url(${this._image})`;
        this._element.querySelector(".elements__title").textContent = this._title;
        this.counterLikes(this._likes);

        if (this._ownerId !== this._userId) {
            this._deleteBtn.style.display = "none";
        }

        return this._element;
    }

    counterLikes = (updatedLikes) => {
        this._likes = updatedLikes;
        this._updateLikesCount();

        if (this.isLikedByUser()) {
            this._likeBtn.classList.add("elements__like-button_active")
        }
        else {
            this._likeBtn.classList.remove("elements__like-button_active")
        }
    }

    isLikedByUser() {
        return this._likes.some(user => user._id === this._userId)
    }

    _setEventListeners() {
        // Open popup image.
        this._element.querySelector(".elements__pic").addEventListener("click", () => this._handleCardClick());

        // Like button.
        this._likeBtn = this._element.querySelector(".elements__like-button");

        this._likeBtn.addEventListener("click", () => this._handleLike(this._id));

        // remove card from the gallery.
        this._deleteBtn = this._element.querySelector(".elements__delete-button");
        this._deleteBtn.addEventListener("click", () => this._handleDelete(this._id));
    }

    _updateLikesCount = () => {
        this._element.querySelector(".element__like-counter").textContent = this._likes.length;
    }

    removeCard() {
        this._element.remove();
    }

    _toggleLike = () => {
        this._element.querySelector(".elements__like-button").classList.toggle("elements__like-button_active");
    }

}

export default Card;