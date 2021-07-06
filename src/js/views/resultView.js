// import View from "./View";
// import previewView from "./previewView";
// import icons from "url:../../img/icons.svg"; //Parcel 1

// class resultView extends View {
//   _parentElement = document.querySelector(".results");
//   _errorMassage = "No recipes found for your query, please try again";
//   _message = "";

//   _generateMarkup() {
//     const asu = this._data
//       // !melakukan looping pada this._data dan mengambil data result yaitu masing masing data preview dari array ke [0] s/d array ke [9], lalu data tersebut menjadi argument untuk render dengan argument kedua menjadi false agar yang di return adalah nilai array per result
//       .map(result => previewView.render(result, false))
//       .join("");

//     return asu;
//   }
// }

// export default new resultView();

import View from "./previewView.js";
import PreviewView from "./previewView.js";

class ResultsView extends PreviewView {
  _parentElement = document.querySelector(".results");
  _errorMassage = "No recipes found for your query! Please try again.";
  _Message = "";
}

export default new ResultsView();
