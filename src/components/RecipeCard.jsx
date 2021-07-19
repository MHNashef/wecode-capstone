import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../DAL/userApi";
import { getRecipeViews } from "../DAL/api";
import "../styles/RecipeCard.css";

export default function RecipeCard({
  userId,
  recipeName,
  recipeId,
  recipeImg,
}) {
  const editStyles = { color: "#007bff", fontSize: "1.5em", cursor: "pointer" };
  const history = useHistory(null);
  const user = getCurrentUser();
  const [recipeViews, setRecipeViews] = useState(0);

  function viewRecipe({ target: { id } }) {
    console.log(id);
    history.push(`recipe/${id}`);
  }

  function editRecipe({ target: { parentElement } }) {
    history.push(`editRecipe/${parentElement.parentElement.id}`);
  }

  useEffect(() => {
    getRecipeViews(recipeId, (response) => {
      setRecipeViews(response);
    });
  }, []);

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
          <Card.Body id={recipeId}>
            <Card.Title id={recipeId}>{recipeName}</Card.Title>
            {user?.id == userId ? (
              <MdEdit style={editStyles} onClick={editRecipe} />
            ) : null}
            <GrView />
            <small className="ml-2">{recipeViews[0]?.views}</small>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
