import icons from "url:../../img/icons.svg"; //Parcel 1

export default class View {
  _data;
  /**
   * Render The Recipe Object to the dom
   * @param {Object | Object[]} data the data to be rendered (ex recipe)
   * @returns {undefined}
   * @this {Object} View instance
   *
   */

  // !render menggunakan data sebagai parameter, dimana data adalah data yang ada pada model
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    // !data yang masuk diubah menjadi #data agar secure dan hanya dipakai di dalam object saja
    this._data = data;
    const markup = this._generateMarkup();

    // if (!render) {
    //   const ret = markup;
    //   return ret;
    // }

    // !! parent element digunakan untuk merender data markup, dengan di clear sebelumnya
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    // !data yang masuk diubah menjadi #data agar secure dan hanya dipakai di dalam object saja
    this._data = data;

    // !membuat markup baru dimana berisi markup sesudah dilakukan perubahan, artinya html baru yang ketika adanya perubahan pada page akan tersimpan di newMarkup
    const newMarkup = this._generateMarkup();

    // !markup diatas akan berupa string/html fragment yang nantinya diubah menjadi DOM object yang berada pada document fragment
    const newDom = document.createRange().createContextualFragment(newMarkup);

    // !dari DOM diatas lalu dom dirubah menjadi arr
    const newElement = Array.from(newDom.querySelectorAll("*"));
    const currentElement = Array.from(
      this._parentElement.querySelectorAll("*")
    );

    // !melakukan loop pada newelement dimana nantinya merubah apa yang ada pada current element ke new element, parameter yang dipakai adalah newEL (sebagai element baru) dan i untuk dilooping pada array lama karena akan memanggil element elementnya
    newElement.forEach((newEl, i) => {
      const curEl = currentElement[i];
      if (
        // !isEqualNode akan melakukan comparing (true/false) dari keseluruahn nodelist yang ada pada newEl terhadap curEl (dimana keduanya adalah sebuah node dengan type 1 (element node yang berisi seperti <div></div>, <p></p>, dll))
        !newEl.isEqualNode(curEl) &&
        // !melihat child pertama yang akan direturn, jika tidak ada ada child (.?) maka akan langsung di return, jika firstchild ada dan didalamnya adanya nodeValue (akan true jika ada node textnya), lalu akan di trim. dan jika ada valenya maka kondisi if dilakukan
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        // !mengubhah element yang sekarang ada di page ke element baru dengan kondisi diatas
        curEl.textContent = newEl.textContent;
      }

      // !melakukan pengecekan apakah node dari yang lama  beda dengan node yang baru
      if (!newEl.isEqualNode(curEl)) {
        // !melakukan perubahan pada NameNodeMap (yang memiliki attr object) dimana memasukan attribute baru ke dalam attribute lama
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    // !render spinner
    const markup = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
    </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  // !render messege

  renderMessage(message = this._message) {
    const markup = `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  // !render error
  renderError(message = this._errorMassage) {
    const markup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div> `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
