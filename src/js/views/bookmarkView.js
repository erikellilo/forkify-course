// import View from "./View";
// import previewView from "./previewView";
// import icons from "url:../../img/icons.svg"; //Parcel 1

// class bookmarkView extends View {
//   _parentElement = document.querySelector(".bookmarks__list");
//   _errorMassage = " No bookmarks yet. Find a nice recipe and bookmark it :)";
//   _message = "";

//   _generateMarkup() {
//     return this._data
//       .map(bookmark => previewView.render(bookmark, false))
//       .join("");
//   }
// }

// export default new bookmarkView();

import View from "./previewView.js";
import PreviewView from "./previewView.js";

class BookmarksView extends PreviewView {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMassage = "No bookmarks yet. Find a nice recipe and bookmark it :)";
  _message = "";

  addHandlerRenderBookmark(handler) {
    window.addEventListener("load", handler);
  }
}

export default new BookmarksView();
