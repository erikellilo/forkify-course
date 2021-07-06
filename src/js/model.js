// !export data receipe yang dibuat didalam variable baru agar tidak perlu melakukan async ke data

import { async } from "regenerator-runtime";
import { API_URL } from "./config";
// import { getJSON } from "./helper";
import { RES_PER_PAGE } from "./config";
// import { sendJSON } from "./helper";
import { KEY } from "./config";
import { AJAX } from "./helper";

// *export state awal
export const state = {
  recipe: {},
  search: {
    query: "",
    result: [],
    page: 1,
    resultperPage: RES_PER_PAGE,
  },
  bookmark: [],
};

const createRecipeObject = function (data) {
  const recipe = data.data.recipe;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

// *export function loadrecipe dengan id sebagai parameter agar nanti bisa diisi oleh #hash

export const loadRecipe = async function (id) {
  // !Get Data From API
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

    //  !buat data lokal (recipe) agar tidak merubah data asli yang didapat dari yang diambil di API !(data)
    state.recipe = createRecipeObject(data);

    if (state.bookmark.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
    console.log(state.recipe);
  } catch (err) {
    // console.log(`${err} nih CUY`);
    throw err;
  }
};

// *xport function loadsearch, dimana memakai parameter query dari value yang didapat di DOM .search
export const loadSearchResult = async function (query) {
  try {
    // !membuat default query yang akan dipakai untuk fetching data, sebagai key untuk mendapatkan mendapatkan data dari API
    state.search.query = query;

    // !data API di storage
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    // !merubah data awalan ketika nantinya fungsi ini dipanggil
    state.search.result = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        publisher: rec.publisher,
        image: rec.image_url,
        title: rec.title,
        ...(rec.key && { key: rec.key }),
      };
    });
    // !mengubah page ketika melakukan search dengan query yang lain menjadi page awal lagi
    state.search.page = 1;
  } catch (err) {
    console.log(err);
  }
};

//  *export fungsi untuk mendapatkan page awal dan page akhir dari hasil pencarian
export const getsearchResultPage = function (page = state.search.page) {
  // !membuat fungsi untuk memanggil page mana yang akan dikeluarkan ketika melakukan search (default state.search.page = 1)
  state.search.page = page;

  // !menampilkan data dari array ke [0] (sebagai start) dan [9] (sebagai end). data akan terakumulasi ketika nilai page berubah, jika berada di page 2 maka start akan bermula di (2-1*10) yaitu data array ke [10] dan nilai akhir berada pada (2*10) yaitu data ke [20] dst dst
  const start = (page - 1) * state.search.resultperPage; //0;
  const end = page * state.search.resultperPage; //  9;

  // !mereturn data awal dan akhir untuk dipakai nantinya
  return state.search.result.slice(start, end);
};

export const updateServing = function (newServing) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
  });

  state.recipe.servings = newServing;
};

const persistBookmark = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmark));
};

export const addBookmark = function (recipe) {
  state.bookmark.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmark();
};

export const deleteBookmark = function (id) {
  const index = state.bookmark.findIndex(el => el.id === id);
  state.bookmark.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmark();
};

const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmark = JSON.parse(storage);
};
init();
console.log(state.bookmark);

const clearBookmark = function () {
  localStorage.clear("bookmarks");
};

// clearBookmark();

export const uploadRecipe = async function (newRecipe) {
  try {
    // console.log(Object.entries(newRecipe));
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map(ing => {
        // const ingArray = ing[1].replaceAll(" ", "").split(",");
        const ingArray = ing[1].split(",").map(el => el.trim());

        if (ingArray.length !== 3)
          throw new Error(
            "Wrong Ingredients Format, Please use Correct Format"
          );
        const [quantity, unit, description] = ingArray;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);

    state.recipe = createRecipeObject(data);
    console.log(state.recipe);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
