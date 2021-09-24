export default class Section {
  constructor({ data, renderer }, selector) {
    this._renderedItems = data;
    this._container = document.querySelector(selector);
    this._renderer = renderer;
  }

  renderItems = () => {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  addItem = (element) => {
    this._container.prepend(element);
  }

}
