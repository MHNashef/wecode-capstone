import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaPinterest } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Spinner,
  Image,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  getRecipeById,
  getRecipeInstructions,
  getRecipeIngredients,
  incrementViews,
} from "../DAL/api";
import {
  getCurrentUser,
  getIsFavorite,
  removeFavorite,
  setAsFavorite,
} from "../DAL/userApi";
import { useAuth } from "../AuthContext";

export default function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [recipeInstructions, setRecipeInstructions] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [spinnerOn, setSpinnerOn] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const currUser = getCurrentUser();
  const [auth] = useAuth();

  function onJsonResponse(response) {
    setRecipe(response);
  }

  function instructionsJsonResponse(response) {
    setRecipeInstructions(response);
  }

  function ingredientsJsonResponse(response) {
    setRecipeIngredients(response);
  }

  function handleFavorite() {
    if (isFavorite) {
      removeFavorite({ recipeId: id, userId: currUser.id });
      setIsFavorite(false);
    } else {
      setAsFavorite({ recipeId: id, userId: currUser.id });
      setIsFavorite(true);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setSpinnerOn(false);
    }, 1000);

    if (auth) {
      getIsFavorite(
        (response) => {
          if (response[0].count >= 1) {
            setIsFavorite(true);
          } else {
            setIsFavorite(false);
          }
        },
        currUser.id,
        id
      );
    }
    getRecipeById(onJsonResponse, id);
    getRecipeInstructions(instructionsJsonResponse, id);
    getRecipeIngredients(ingredientsJsonResponse, id);
    incrementViews(id);
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
        <Container className="mb-5">
          <Row className="mt-5">
            <Col>
              <h1
                style={{ fontWeight: "800", display: "inline-block" }}
                className="mr-5"
              >
                {recipe[0]?.recipe_name || (
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                )}
              </h1>
              {auth ? (
                isFavorite ? (
                  <MdFavorite
                    className="mb-3"
                    style={{
                      fontSize: "1.7em",
                      color: "#ba3b46",
                      cursor: "pointer",
                    }}
                    onClick={handleFavorite}
                  />
                ) : (
                  <MdFavoriteBorder
                    className="mb-3"
                    style={{
                      fontSize: "1.7em",
                      color: "#ba3b46",
                      cursor: "pointer",
                    }}
                    onClick={handleFavorite}
                  />
                )
              ) : null}
              {}
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
          <Row>
            <Col>
              {(
                <Image
                  src={`http://localhost:3001/${recipe[0]?.img_path}`}
                  rounded
                />
              ) || (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              )}
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
          <Row className="mt-3" lg={2} md={1} sm={1} xs={1}>
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
            <Col className="prep-list">
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
      )}
    </>
  );
}
