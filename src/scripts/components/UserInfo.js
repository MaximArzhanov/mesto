export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameSelector = nameSelector;
    this._descriptionSelector = descriptionSelector;
  }

  getUserInfo = () => {
    const data = {
      name: document.querySelector(this._nameSelector).textContent,
      description: document.querySelector(this._descriptionSelector).textContent
    };
    return data;
  }

  setUserInfo = (name, description) => {
    document.querySelector(this._nameSelector).textContent = name;
    document.querySelector(this._descriptionSelector).textContent = description;
  }

}
