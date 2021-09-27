/** Создаёт объект с данными для карточки. */
const createObjectSelector = () => {
  const data = {
    nameSelectorProfile: '.profile__name',
    descriptionSelectorProfile: '.profile__description'
  }
  return data;
}

export {
  createObjectSelector
}
