// data for homepage
// images of all recipes
function getRecipes() {
  return [
    {
      id: 1,
      user_id: 1,
      recipe_name: "My First Recipe",
      general_info: "Some info about my first recipe",
      view: 5,
      image:
        "https://image.shutterstock.com/image-photo/delicious-grilled-burgers-600w-1146199442.jpg",
      date_created: "22-06-2021 10:50",
    },
    {
      id: 2,
      user_id: 1,
      recipe_name: "My Second Recipe",
      general_info: "Some info about my second recipe",
      view: 3,
      image:
        "https://image.shutterstock.com/image-photo/delicious-grilled-burgers-600w-1146199442.jpg",
      date_created: "22-06-2021 10:55",
    },
  ];
}

// data for user's favorites' page
// this function returns an array containing the favorites of all users
// can be customised to only return favorites of logged-in user
function getFavoriteRecipes() {
    return [
        {
            user_id: 1,
            recipe_id: 2,
        }
    ];
}

// pagination
function getRecipesPagination(pageNum, orderBy, isAsc) {

}