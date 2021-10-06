export default class UserInfo {
  constructor({ nameSelectorProfile, descriptionSelectorProfile, avatarSelectorProfile }) {
    this._nameUserProfile = document.querySelector(nameSelectorProfile);
    this._descriptionUserProfile = document.querySelector(descriptionSelectorProfile);
    this._avatarUserProfile = document.querySelector(avatarSelectorProfile);
  }

  getUserInfo = () => {
    const data = {
      name: this._nameUserProfile.textContent,
      description: this._descriptionUserProfile.textContent,
      id: this._id
    };
    return data;
  }

  setUserInfo = (name, description, id) => {
    this._nameUserProfile.textContent = name;
    this._descriptionUserProfile.textContent = description;
    this._id = id;
  }

  setUserAvatar = (link) => {
    this._avatarUserProfile.src = link;
  }

}
