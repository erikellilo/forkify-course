// import View from "./View";
// import icons from "url:../../img/icons.svg"; //Parcel 1

// class previewView extends View {
//   _parentElement = "";

//   _generateMarkup() {
//     const id = window.location.hash.slice(1);

//     return `<li class="preview">
//     <a class="preview__link ${
//       this._data.id === id ? `preview__link--active` : ""
//     }" href="#${this._data.id}">
//     <figure class="preview__fig">
//         <img src="${this._data.image}" alt="${this._data.title}" />
//     </figure>
//     <div class="preview__data">
//         <h4 class="preview__title">${this._data.title}</h4>
//         <p class="preview__publisher">${this._data.publisher}</p>
//     </div>
//     </a>
// </li>`;
//   }
// }

// export default new previewView();

import View from "./View.js";

import icons from "url:../../img/icons.svg";

export default class PreviewView extends View {
  _generateMarkup() {
    const asu = this._data.map(this._generateMarkupPreview).join("");
    // console.log(asu);
    return asu;
  }

  _generateMarkupPreview(val) {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">  
      <a class="preview__link ${
        val.id === id ? "preview__link--active" : ""
      }" href="#${val.id}">
        <figure class="preview__fig">
          <img src="${val.image}" alt="${val.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${val.title}</h4>
          <p class="preview__publisher">${val.publisher}</p>
          <div class="preview__user-generated ${val.key ? "" : "hidden"}">
          <svg>
          <use href="${icons}#icon-user"></use>
          </svg>
          </div>
          </div>
      </a>
    </li>
  `;
  }
}
