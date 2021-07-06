import View from "./View";

// !mengambil data icons dari folder
import icons from "url:../../img/icons.svg"; //Parcel 1

// !mengambil data fraction dari ndm
import { Fraction } from "fractional";

class recipeView extends View {
  // !membuat general parent element yang nantinya bisa digunakan oleh sibling child
  _parentElement = document.querySelector(".recipe");
  _errorMassage = "we couldnt find the menu";
  _message = "";

  // !handler untuk sub-publish pattern dimana menjalankan event dengan memanggil handlernya sendiri, dimana handler tersebut adalah parameter yang diberi argument function di control

  addHandlerRenderMethod(handler) {
    const loadEvent = ["hashchange", "load"];
    loadEvent.forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateService(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--update-servings");
      if (!btn) return;

      const { updateTo } = btn.dataset;

      if (+updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-bookmark");
      if (!btn) return;
      handler();
    });
  }

  // !melakukan generate untuk data detail dari recipes
  _generateMarkup() {
    return `
    <figure class="recipe__fig">
      <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--update-servings" data-update-to=${
            this._data.servings - 1
          }>
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--update-servings" data-update-to=${
            this._data.servings + 1
          }>
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">
        <svg>
        <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round btn-bookmark">
        <svg class="">
          <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
      ${
        /* //!melakukan looping pada array, dan merubah datanya menjadi string */ ""
      }
    ${this._data.ingredients.map(this._generateMarkupIngredients).join("")}

    </div>
    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this._data.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>`;
  }

  // !render data inggredient
  _generateMarkupIngredients(ing) {
    return `<li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${
      // !pengecekan data ing ada atau tidak, jika ada dilakukan fraction dan diubah ke string
      ing?.quantity ? new Fraction(ing.quantity).toString() : ""
    }</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ing.unit}</span>
      ${ing.description}
    </div>
  </li>`;
  }
}

// !  Agar hanya bisa akses ke object tapi tidak bisa akses ke class
export default new recipeView();
