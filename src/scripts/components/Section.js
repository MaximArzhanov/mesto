export default class Section {
  constructor({ requestData }, selector) {
    this._renderedItems = requestData;
    this._container = document.querySelector(selector);
    //this._renderer = renderer;
  }

  renderItems = () => {
    this._renderedItems();
    /*this._renderedItems.forEach(item => {
      this._renderer(item);
    });*/
  }

  addItem = (element) => {
    this._container.prepend(element);
  }

}
