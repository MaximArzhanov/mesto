export default class UserInfo {
  constructor({ nameSelectorProfile, descriptionSelectorProfile }) {
    this._nameUserProfile = document.querySelector(nameSelectorProfile);
    this._descriptionUserProfile = document.querySelector(descriptionSelectorProfile);
  }

  getUserInfo = () => {
    const data = {
      name: this._nameUserProfile.textContent,
      description: this._descriptionUserProfile.textContent
    };
    return data;
  }

  setUserInfo = (name, description) => {
    this._nameUserProfile.textContent = name;
    this._descriptionUserProfile.textContent = description;
  }

}
