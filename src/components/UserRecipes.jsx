import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import RecipeCard from "./RecipeCard";
import { getCurrentUser, getUserRecipes } from "../DAL/userApi";

export default function UserRecipes() {
  const currUser = getCurrentUser();
  const [currUserRecipes, setCurrUserRecipes] = useState([]);

  useEffect(() => {
    getUserRecipes((response) => {
      setCurrUserRecipes(response);
    }, currUser.id);
  }, []);

  return (
    <>
      <div class="jumbotron jumbotron-fluid jumbo-bg">
        <div class="container">
          <h1 class="display-4" style={{ fontWeight: "800" }}>
            Your Recipes
          </h1>
        </div>
      </div>
      <Container>
        <Row lg={4} md={2} sm={1} xs={1} className="mt-1">
          {currUserRecipes.map((recipe) => (
            <Col>
              <RecipeCard
                userId={recipe.user_id}
                recipeName={recipe.recipe_name}
                recipeId={recipe.id}
                recipeImg={recipe.img_path}
                recipeViews={recipe.views}
              ></RecipeCard>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
