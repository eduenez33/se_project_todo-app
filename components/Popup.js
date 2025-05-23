class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    console.log(this._popupElement);
  }

  _handleEscapeClose() {}

  open() {}

  close() {}

  setEventListeners() {}
}

export default Popup;
