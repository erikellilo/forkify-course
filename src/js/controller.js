// !import semua data dari model.js (state, function loadreceipe)
import * as model from "./model.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";
import paginationView from "./views/paginationView.js";
import bookmarkView from "./views/bookmarkView";
import addRecipeView from "./views/addRecipeView.js";
import { MODEL_CLOSE_SEC } from "./config.js";

import { async } from "regenerator-runtime";

// if (module.hot) {
//   module.hot.accept();
// }

// * async function untuk keseluruhan recipes
const controlRecipes = async function () {
  try {
    // !mendapatkan id dari hash windows (alamat url)
    const id = window.location.hash.slice(1);

    // !guard close jika tidak ada id
    if (!id) return;
    recipeView.renderSpinner();

    resultView.update(model.getsearchResultPage());
    bookmarkView.update(model.state.bookmark);

    // !loading receipt
    // !karena load promises bersifat promises, maka mengambil datanya menggunakan await
    await model.loadRecipe(id);

    // !rendering receipt
    // !recipeview.render dipanggil dengan menggunakan argument  data, yang didapat dari load.recipe diatas, data dari recipe(yang dibutuhkan untuk di load dijadikan argument)
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.log(err);
  }
};

// *async function untuk load seacrh
const controlSearchResult = async function () {
  try {
    // !render spinner ketika menunggu hasil dari search keluar
    resultView.renderSpinner();

    // !mengambil data dari function get query untuk mendapatkan query data yang akan dicari contoh nya query "pizza"
    const query = searchView.getQuery();

    // !guard close
    if (!query) return;

    // !alternatif merubah search menjadi page awal lagi
    // if (model.state.search.page !== 1) model.state.search.page = 1;

    // !melakukan pemanggilan promises loadsearch dengan inputan query dari variable yang dibuat diatas
    await model.loadSearchResult(query);

    // !pemanggilan render result view dimana yang dirender adalah sebanyak data yang di slice oleh model. getsearchresultpage dengan default page dari state.page.search

    resultView.render(model.getsearchResultPage());

    // !pemanggilan pagination (page maju/mundur) dengan data dari model, yaitu yang dibutuhkan data page
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // !melakukan render ulang ketika adanya perubahan / event yang terjadi, perubahan pertama dengan melakukan resultview yaitu seluruh search, dengan memasukan page dari masukan di gotopage ( yaitu perubahan dari data html

  resultView.render(model.getsearchResultPage(goToPage));

  // !pemanggilan pagination (page maju/mundur) dengan data dari model, yaitu yang dibutuhkan data page

  paginationView.render(model.state.search);
};

const controlServing = function (newServing) {
  model.updateServing(newServing);

  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarkView.render(model.state.bookmark);
};

const controlBookmark = function () {
  bookmarkView.render(model.state.bookmark);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();
    bookmarkView.render(model.state.bookmark);

    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    // window.history.back();

    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODEL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log("BOM", err);
    addRecipeView.renderError(err.message);
  }
};

const newFeature = function () {
  console.log("welcome to the application ");
};

const init = function () {
  bookmarkView.addHandlerRenderBookmark(controlBookmark);
  // !subs-publish pattern
  // !memakai function yang import (recipe view, search view dll) dengan memakai argument adalah fungsi yang akan dijalankan untuk view tersebut,
  // !contohnya memanggil recipeView addhandlerrendermethod yang didalamnya melakukan listen pada load dan hashchange, dimana dua event itu akan menajalankan fungsi control recipes yaitu melakukan render data recipe
  recipeView.addHandlerRenderMethod(controlRecipes);
  recipeView.addHandlerUpdateService(controlServing);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  newFeature();
};
init();
