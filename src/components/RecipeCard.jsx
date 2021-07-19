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

  function viewRecipe({ target: { id } }) {
    console.log(id);
    history.push(`recipe/${id}`);
  }

  function editRecipe({ target: { parentElement } }) {
    history.push(`editRecipe/${parentElement.parentElement.id}`);
  }

  function test(e) {
    console.log(e);
  }

  return (
    <>
      <Container>
        <Card
          style={{ width: "15rem", cursor: "pointer" }}
          className="recipe-hover"
          onClick={viewRecipe}
          id={recipeId}
        >
          <Card.Img
            variant="top"
            src={`http://localhost:3001/${recipeImg}`}
            style={{ height: "12rem" }}
            id={recipeId}
          />
          <Card.Body>
            <Card.Title id={recipeId}>{recipeName}</Card.Title>
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
