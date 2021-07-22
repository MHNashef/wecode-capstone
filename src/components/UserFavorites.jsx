import React, { useEffect, useState } from "react";
import { Container, Spinner, Col, Row, Alert } from "react-bootstrap";
import RecipeCard from "./RecipeCard";
import { getCurrentUser, getFavorites } from "../DAL/userApi";

export default function UserFavorites() {
  const [spinnerOn, setSpinnerOn] = useState(true);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const currUser = getCurrentUser();

  useEffect(() => {
    setTimeout(() => {
      setSpinnerOn(false);
    }, 1000);

    getFavorites((response) => {
      setFavoriteRecipes(response);
    }, currUser.id);
  }, []);

  return (
    <>
      {spinnerOn ? (
        <Spinner
          className="spinner"
          animation="border"
          role="status"
          variant="danger"
        />
      ) : (
        <>
          <div class="jumbotron jumbotron-fluid jumbo-bg">
            <div class="container">
              <h1 class="display-4" style={{ fontWeight: "800" }}>
                Your Favorites
              </h1>
            </div>
          </div>
          <Container>
            <Row lg={4} md={2} sm={1} xs={1} className="mt-1">
              {favoriteRecipes.length !== 0 ? (
                favoriteRecipes?.map((recipe) => (
                  <Col>
                    <RecipeCard
                      userId={recipe.user_id}
                      recipeName={recipe.recipe_name}
                      recipeId={recipe.id}
                      recipeImg={recipe.img_path}
                      recipeViews={recipe.views}
                    ></RecipeCard>
                  </Col>
                ))
              ) : (
                <Alert variant="danger" className="text-center">
                  You currently have no recipes added to your favorites
                </Alert>
              )}
            </Row>
          </Container>
        </>
      )}
    </>
  );
}
