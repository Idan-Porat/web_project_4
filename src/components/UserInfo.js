export default class UserInfo {
    constructor({ nameSelector, carrerSelector }) {
        this._nameSelector = nameSelector;
        this._carrerSelector = carrerSelector;
        this._name = document.querySelector(this._nameSelector);
        this._carrer = document.querySelector(this._carrerSelector);
    }

    getUserInfo = () => {
        return { name: this._name.textContent, carrer: this._carrer.textContent };
    }

    setUserInfo({ name, carrer }) {
        this._name.textContent = name;
        this._carrer.textContent = carrer;
    }
}