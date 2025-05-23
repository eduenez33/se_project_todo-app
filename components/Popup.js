class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    console.log(this._popupElement);
  }

  _handleEscapeClose() {}

  open() {
    this._popupElement.classList.add("popup_visible");
  }

  close() {}

  setEventListeners() {}
}

export default Popup;
