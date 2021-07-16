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

async function getRecipeById(resCallback, id) {
  try {
    const response = await axios.get(
      `http://localhost:3001/recipes/recipeId/${id}`
    );
    resCallback(response.data);
  } catch (err) {
    console.error(err);
  }
}

async function getRecipeInstructions(resCallback, id) {
  try {
    const response = await axios.get(
      `http://localhost:3001/recipes/recipeId/${id}/instructions`
    );
    resCallback(response.data);
  } catch (err) {
    console.error(err);
  }
}

async function getRecipeIngredients(resCallback, id) {
  try {
    const response = await axios.get(
      `http://localhost:3001/recipes/recipeId/${id}/ingredients`
    );
    resCallback(response.data);
  } catch (err) {
    console.error(err);
  }
}

async function getMeasurements(resCallback) {
  try {
    const response = await axios.get(`http://localhost:3001/recipes/get/measurements`);
    resCallback(response.data);
  } catch (err) {
    console.log(err);
  }
}

async function getIngredients(resCallback) {
  try {
    const response = await axios.get(`http://localhost:3001/recipes/get/ingredients`);
    resCallback(response.data);
  } catch (err) {
    console.log(err);
  }
}

async function createRecipe(recipeInfo) {
  try {
    const response = await axios.post("http://localhost:3001/recipes/create/recipe", recipeInfo);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

// pagination
function getRecipesPagination(pageNum, orderBy, isAsc) {}

export {
  getRecipes,
  getPopularRecipes,
  getRecentRecipes,
  getRecipeById,
  getRecipeInstructions,
  getRecipeIngredients,
  getMeasurements,
  getIngredients,
  createRecipe
};
