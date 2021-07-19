import React from "react";
import { Card, Button, Container } from "react-bootstrap";
import { MdFavoriteBorder, MdEdit } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../DAL/userApi";
import "../styles/RecipeCard.css";

export default function RecipeCard({
  userId,
  recipeName,
  recipeId,
  recipeImg,
}) {
  const favStyles = { color: "red", fontSize: "1.5em" };
  const editStyles = { color: "#007bff", fontSize: "1.5em", cursor: "pointer" };
  const history = useHistory(null);
  const user = getCurrentUser();

  function viewRecipe({ target: { parentElement } }) {
    history.push(`recipe/${parentElement.id}`);
  }
  function editRecipe({ target: { parentElement } }) {
    history.push(`editRecipe/${parentElement.parentElement.id}`);
  }
  return (
    <>
      <Container>
        <Card style={{ width: "15rem" }} className="recipe-hover">
          <Card.Img
            variant="top"
            src={`http://localhost:3001/${recipeImg}`}
            style={{ height: "12rem" }}
          />
          <Card.Body id={recipeId}>
            <Card.Title>{recipeName}</Card.Title>
            <Button variant="primary" className="btn-sm" onClick={viewRecipe}>
              View Recipe
            </Button>
            {user?.id == userId ? (
              <MdEdit
                className="ml-3"
                style={editStyles}
                onClick={editRecipe}
              />
            ) : null}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
