export default class UserInfo {
    constructor({ nameSelector, carrerSelector, avatarSelector }) {
        this._nameSelector = nameSelector;
        this._carrerSelector = carrerSelector;
        this._avatarSelector = avatarSelector;
        this._name = document.querySelector(this._nameSelector);
        this._carrer = document.querySelector(this._carrerSelector);
        this._avatar = document.querySelector(this._avatarSelector);
    }

    getUserInfo = () => {
        return { name: this._name.textContent, carrer: this._carrer.textContent, avatar: this._avatar.src };
    }

    setUserInfo({ fullName, carrer }) {
        this._name.textContent = fullName;
        this._carrer.textContent = carrer;
    }

    setUserAvatar(avatar) {
        this._avatar.src = avatar;
    }
}