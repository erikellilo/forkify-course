import View from "./View";
import icons from "url:../../img/icons.svg"; //Parcel 1

// *EXTENDS CLASS FROM VIEW (memiliki properties dari parent)

class paginationView extends View {
  _parentElement = document.querySelector(".pagination");

  // !melakukan event handler pada click di keseluruhan (parent element)
  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      //   e.preventDefault;

      // !listening even yang terjadi dalama parent element berupa click, jika click terjadi pada target child yang memiliki btn--inline, maka data tersebut di store ke btn
      const btn = e.target.closest(".btn--inline");

      // !jika child tidak memiliki btn--inline(ketika di click akan undifiend / false) maka akan langsung di return
      if (!btn) return;

      // !menyimpan data atributes dari btn tersebut dan dirubah ke int
      const goToPage = +btn.dataset.goto;

      // !handler memanggil function controlpagination dengan nilai parameter dari variable btn.dataset
      handler(goToPage);
    });
  }

  // !menambahkan html mark up ke page
  _generateMarkup() {
    // !Mengambil data page awal dari data.page, dimana data defaultnya adalah satu
    const curPage = this._data.page;

    // !Menghitung jumlah data dari keseluruhan array dari result, dengan default dari controller sebanyak 10
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultperPage
    );

    // !melakukan insert pada generatemarkup jika page yang sekarang 1 dan jika banyaknya data dari satu page lebih dari 10 (bisa next)
    // at page 1 there are other pages
    if (curPage === 1 && numPages > 1) {
      return ` <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
                </button>`;
    }

    // !melakukan insert pada generatemarkup jika page yang sekarang ada di page terkahir, dimana yang di render hanyalan button left dengan current page adalah terkahir -1 (untuk kembali ke page sebelumnya)
    // on a last page
    if (curPage === numPages && numPages > 1) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>`;
    }

    // !jika ada ditengah tengah page, maka generatemarkup akan merender dua button yaitu prev untuk kembali ke page sebelumnya, dan next untuk ke page selanjutnya
    // on some other middle page
    if (curPage < numPages) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
                </button>
                <button data-goto="${
                  curPage + 1
                }" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>`;
    }
    // at page 1 there are no other pages

    // !tidak merender apapun karena data dari data.page tidak lebih dari 10
    return "";
  }
}

export default new paginationView();
