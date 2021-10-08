export default class Section {
  constructor({ renderer, requestData }, selector) {
    this._renderedItems = requestData;
    this._container = document.querySelector(selector);
    this._renderer = renderer;
  }

  renderDefaultItems = () => {
    this._renderedItems();
  }

  renderItems = (items) => {
    items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem = (element) => {
    this._container.prepend(element);
  }

}
