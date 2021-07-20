import axios from "axios";

async function getRecipes(resCallback, count) {
  try {
    const myUrl = "http://localhost:3001/recipes" + (count ? "/count" : "");
    console.log(myUrl);
    const response = await axios.get(myUrl);
    resCallback(response.data);
  } catch (err) {
    console.error(err);
  }
}
async function getRecipesPaged(resCallback, limit, page) {
  try {
    const myUrl = `http://localhost:3001/recipes/l/${limit}/p/${page}`;
    const response = await axios.get(myUrl);
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
async function getRecipeMealType(resCallback, id) {
  try {
    const response = await axios.get(
      `http://localhost:3001/recipes/recipeId/${id}/mealtype`
    );
    resCallback(response.data);
  } catch (err) {
    console.error(err);
  }
}

async function getMealTypes(resCallback) {
  try {
    const response = await axios.get(
      `http://localhost:3001/recipes/list/mealtypes`
    );
    resCallback(response.data);
  } catch (err) {
    console.error(err);
  }
}

async function getRecipeDietType(resCallback, id) {
  try {
    const response = await axios.get(
      `http://localhost:3001/recipes/recipeId/${id}/diettype`
    );
    resCallback(response.data);
  } catch (err) {
    console.error(err);
  }
}

async function getDietTypes(resCallback) {
  try {
    const response = await axios.get(
      `http://localhost:3001/recipes/list/diettypes`
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
    const response = await axios.get(
      `http://localhost:3001/recipes/get/measurements`
    );
    resCallback(response.data);
  } catch (err) {
    console.log(err);
  }
}

async function getIngredients(resCallback) {
  try {
    const response = await axios.get(
      `http://localhost:3001/recipes/get/ingredients`
    );
    resCallback(response.data);
  } catch (err) {
    console.log(err);
  }
}

// async function getDietTypes(resCB) {
//   try {
//     const res = await axios.get("http://localhost:3001/users/diettypes");
//     resCB(res.data);
//   } catch (err) {
//     console.error(err);
//   }
// }

async function updateRecipe(recipeInfo) {
  try {
    const response = await axios.put(
      "http://localhost:3001/recipes/update/recipe",
      recipeInfo
    );
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}
async function createRecipe(recipeInfo, resCB) {
  try {
    const response = await axios.post(
      "http://localhost:3001/recipes/create/recipe",
      recipeInfo
    );
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

async function uploadRecipeImage(fileData, callBack) {
  // TBD: axios doesn't work, why?
  // const fetchRes = await axios.post("http://localhost:3001/images/imgUpload", fileData)
  console.log(fileData);
  const fetchRes = await fetch("http://localhost:3001/images/imgUpload", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: fileData,
  });
  const jsonRes = await fetchRes.json();
  callBack(jsonRes);
}

async function getSearchRes(searchStr, resCallBack) {
  try {
    const res = await axios.get(`http://localhost:3001/search/'${searchStr}'`);
    resCallBack(res.data);
  } catch (err) {
    console.log(err);
  }
}

async function getRecipeViews(recipeId, resCB) {
  try {
    const res = await axios.get(`http://localhost:3001/recipes/get/views/${recipeId}`);
    resCB(res.data);
  } catch (err) {
    console.log(err);
  }
}

async function incrementViews(recipeId) {
  try {
    const res = await axios.put(`http://localhost:3001/recipes/increment/views/${recipeId}`);
  } catch (err) {
    console.log(err);
  }
}

// pagination  .then(res => res.json()).then(res => callBack(res))
function getRecipesPagination(pageNum, orderBy, isAsc) {}

export {
  getRecipes,
  getRecipesPaged,
  getPopularRecipes,
  getRecentRecipes,
  getRecipeById,
  getMealTypes,
  getDietTypes,
  getRecipeMealType,
  getRecipeDietType,
  getRecipeInstructions,
  getRecipeIngredients,
  getMeasurements,
  getIngredients,
  updateRecipe,
  createRecipe,
  uploadRecipeImage,
  getSearchRes,
  getRecipeViews,
  incrementViews
};
