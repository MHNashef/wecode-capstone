import React from "react";
import { Card, Button, Container } from "react-bootstrap";
import { MdFavoriteBorder } from "react-icons/md";
import { useHistory } from "react-router-dom";
import "../styles/RecipeCard.css";

export default function RecipeCard({ recipeName, recipeId, recipeImg }) {
  const iconStyles = { color: "red", fontSize: "1.5em" };
  const history = useHistory(null);

  function viewRecipe({ target: { parentElement } }) {
    history.push(`recipe/${parentElement.id}`);
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
            <MdFavoriteBorder className="ml-3" style={iconStyles} />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
