// * membuat class untuk view

class searchView {
  _data;
  // !melakukan pembuatan handler pada search
  _parentElement = document.querySelector(".search");

  // !mendapatkan data query dari value yang didapatkan dari search__field yang dimasukan nantinya di handler
  getQuery() {
    const query = this._parentElement.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }

  // !Clear sesudah melakukan input

  _clearInput() {
    this._parentElement.querySelector(".search__field").value = "";
  }

  // !handler yang berjalan dengan sub-pub dimana ketika melakukan event submit(enter, melakukan click pada class), dengan memanggil handlernya yaitu control search result yang akan mendapatkan data query, render data searh dan pagation
  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
