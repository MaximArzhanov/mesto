export default class UserInfo {
  constructor({ nameSelectorProfile, descriptionSelectorProfile, avatarSelectorProfile }) {
    this._nameUserProfile = document.querySelector(nameSelectorProfile);
    this._descriptionUserProfile = document.querySelector(descriptionSelectorProfile);
    this._avatarUserProfile = document.querySelector(avatarSelectorProfile);
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

  setUserAvatar = (link) => {
    //this._avatarUserProfile.src = `<%=require('${link}')%>`;
    this._avatarUserProfile.src = link;
  }

}
