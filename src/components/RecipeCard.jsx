import React from "react";
import { Card, Button, Container } from "react-bootstrap";
import { MdFavoriteBorder } from "react-icons/md";
import "../styles/RecipeCard.css"

export default function RecipeCard() {
  const iconStyles = { color: "red", fontSize: "1.5em" };

  return (
    <>
      <Container>
        <Card style={{ width: "15rem" }} className="make-it-slow">
          <Card.Img
            variant="top"
            src="https://via.placeholder.com/210x130.png"
          />
          <Card.Body>
            <Card.Title>Recipe Name</Card.Title>
            <Button variant="primary" className="btn-sm">
              View Recipe
            </Button>
            <MdFavoriteBorder className="ml-3" style={iconStyles} />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
