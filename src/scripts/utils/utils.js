/** Создаёт объект с данными для карточки. */
const createObjectSelector = (name, description) => {
  const data = {
    nameSelector: '.profile__name',
    descriptionSelector: '.profile__description'
  }
  return data;
}

export {
  createObjectSelector
}
