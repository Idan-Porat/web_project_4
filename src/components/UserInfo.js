export default class UserInfo {
    constructor({ nameSelector, careerSelector, avatarSelector }) {
        this._nameSelector = nameSelector;
        this._careerSelector = careerSelector;
        this._avatarSelector = avatarSelector;
        this._name = document.querySelector(this._nameSelector);
        this._career = document.querySelector(this._careerSelector);
        this._avatar = document.querySelector(this._avatarSelector);
    }

    getUserInfo = () => {
        return { name: this._name.textContent, career: this._career.textContent, avatar: this._avatar.src };
    }

    setUserInfo({ fullName, career }) {
        this._name.textContent = fullName;
        this._career.textContent = career;
    }

    setUserAvatar(avatar) {
        this._avatar.src = avatar;
    }
}