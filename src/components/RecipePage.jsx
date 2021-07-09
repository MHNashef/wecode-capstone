import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaPinterest } from "react-icons/fa";
import { Container, Row, Col, ListGroup, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  getRecipeById,
  getRecipeInstructions,
  getRecipeIngredients,
} from "../DAL/api";

export default function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [recipeInstructions, setRecipeInstructions] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);

  function onJsonResponse(response) {
    setRecipe(response);
  }

  function instructionsJsonResponse(response) {
    setRecipeInstructions(response);
  }

  function ingredientsJsonResponse(response) {
    setRecipeIngredients(response);
  }

  useEffect(() => {
    getRecipeById(onJsonResponse, id);
    getRecipeInstructions(instructionsJsonResponse, id);
    getRecipeIngredients(ingredientsJsonResponse, id);
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1 style={{ fontWeight: "800" }}>
              {recipe[0]?.recipe_name || (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              )}
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="lead">
              {recipe[0]?.general_info || (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              )}
            </p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <FaFacebook color="#4267B2" size="1.7em" />

            <a
              href="https://twitter.com/share?ref_src=twsrc%5Etfw"
              className="twitter-share-button"
              data-text="Checkout this delicious recipe I found on RecipeBook! "
              data-show-count="false"
            >
              <FaTwitter color="#1DA1F2" size="1.7em" className="ml-3" />
            </a>
            <FaPinterest color="#E60023" size="1.7em" className="ml-3" />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "800" }}>
              Ingredients
            </h2>
            <ListGroup variant="flush">
              {recipeIngredients.map((ingredient) => (
                <ListGroup.Item>
                  <span style={{ fontWeight: "800" }}>
                    {ingredient.amount}{" "}
                  </span>
                  {ingredient.measurement_name} {ingredient.ingredient_name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "800" }}>
              Preparation
            </h2>
            <ListGroup variant="flush">
              {recipeInstructions.map((instruction) => (
                <ListGroup.Item>
                  <span style={{ fontWeight: "800" }} className="mr-4">
                    {instruction.step_number}
                  </span>
                  {instruction.step_description}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
}
