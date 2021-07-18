import Cookies from "js-cookie";
import React from "react";

const RecipeContext = React.createContext();

function useRecipe() {
  const context = React.useContext(RecipeContext);
  if (!context) {
    throw new Error(`useRecipe must be used within a RecipeProvider`);
  }
  return context;
}

function RecipeProvider(props) {
  const [ctxRecipe, setCtxRecipe] = React.useState({
    editMode: props.edit,
  });

  const value = [ctxRecipe, setCtxRecipe];
  return <RecipeContext.Provider value={value} {...props} />;
}

export { RecipeProvider, useRecipe };
