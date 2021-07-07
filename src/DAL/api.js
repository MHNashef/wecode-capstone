import axios from "axios";

async function getRecipes(resCallback) {
  try {
    const response = await axios.get("http://localhost:3001/recipes");
    resCallback(response.data);
  } catch (err) {
    console.error(err);
  }
}

async function getPopularRecipes(resCallback) {
  try {
    const response = await axios.get("http://localhost:3001/recipes/popular/4");
    resCallback(response.data);
  } catch (err) {
    console.error(err);
  }
}

async function getRecentRecipes(resCallback) {
  try {
    const response = await axios.get("http://localhost:3001/recipes/recent/4");
    resCallback(response.data);
  } catch (err) {
    console.error(err);
  }
}

function getFavoriteRecipes() {
  return [
    {
      user_id: 1,
      recipe_id: 2,
    },
  ];
}

// pagination
function getRecipesPagination(pageNum, orderBy, isAsc) {}

export { getRecipes, getPopularRecipes, getRecentRecipes };








// let jsoned = null;
// fetch('http://localhost:3001/recipes', {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// }).then(response => response.json()).then(json => json);
// // console.log(jsoned);
// return [];
