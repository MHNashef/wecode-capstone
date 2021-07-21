import React from "react";
import { Card } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../DAL/userApi";
import "../styles/RecipeCard.css";

export default function RecipeCard({
  userId,
  recipeName,
  recipeId,
  recipeImg,
  recipeViews,
}) {
  const editStyles = { color: "#000", fontSize: "1.5em", cursor: "pointer" };
  const viewStyles = { fontSize: "1em", fontWeight: "800" };
  const history = useHistory(null);
  const user = getCurrentUser();

  function viewRecipe({ target: { id } }) {
    console.log(id);
    history.push(`recipe/${id}`);
  }

  function editRecipe(recipeId) {
    history.push(`editRecipe/${recipeId}`);
  }

  return (
    <>
      <Card
        style={{ cursor: "pointer" }}
        className="recipe-hover mx-auto my-3"
        id={recipeId}
      >
        <Card.Img
          onClick={viewRecipe}
          variant="top"
          src={`http://localhost:3001/${recipeImg}`}
          style={{ height: "12rem", objectFit: "cover" }}
          id={recipeId}
        />
        <Card.Body id={recipeId}>
          <Card.Title
            style={{ height: "70px", fontWeight: "800" }}
            id={recipeId}
          >
            {recipeName}
          </Card.Title>
          <GrView style={viewStyles} />
          <small className="ml-2">{recipeViews}</small>
          {user?.id == userId ? (
            <MdEdit
              style={editStyles}
              onClick={() => editRecipe(recipeId)}
              className="ml-3"
            />
          ) : null}
        </Card.Body>
      </Card>
    </>
  );
}
