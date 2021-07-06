import View from "./View";
import icons from "url:../../img/icons.svg"; //Parcel 1

// *EXTENDS CLASS FROM VIEW (memiliki properties dari parent)

class addRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _parentElementForm = document.querySelector(".upload__column");
  _message = "Recipe was Succesfuly Uploaded";
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    this._addHandlerCloseEsc();
  }

  toggleWindow() {
    const markup = this._parentElement.innerHTML;
    // console.log(this._parentElement);
    // if (!this._parentElement.contains(this._parentElementForm)) {
    //   console.log(this._parentElement.contains(this._parentElementForm));
    //   this._clear();
    //   this._parentElement.insertAdjacentHTML("afterbegin", markup);
    // }
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
    // console.log(this._parentElement);

    // console.log(this._parentElement.contains(this._parentElementForm));
  }

  keyEscape(e) {
    if (e.key === "Escape" && !this._overlay.classList.contains("hidden")) {
      this.toggleWindow();
    }
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerCloseEsc() {
    document.addEventListener("keydown", this.keyEscape.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();

      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      //   console.log(data);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new addRecipeView();
