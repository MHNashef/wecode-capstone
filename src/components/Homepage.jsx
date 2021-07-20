import React, { useEffect, useState } from "react";
import {
  Carousel,
  Container,
  Col,
  Row,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import "../styles/Homepage.css";
import RecipeCard from "./RecipeCard";
import { getRecentRecipes, getPopularRecipes, getSearchRes } from "../DAL/api";

export default function Homepage() {
  const [mostPopularRecipes, setMostPopularRecipes] = useState([]);
  const [mostRecentRecipes, setMostRecentRecipes] = useState([]);
  const [searchRes, setSearchRes] = useState([]);
  const [searchStr, setSearchStr] = useState("");

  function popularJsonResponse(response) {
    setMostPopularRecipes(response);
  }

  function recentJsonResponse(response) {
    setMostRecentRecipes(response);
  }

  function searchForRecipe() {
    getSearchRes(searchStr, (res) => {
      setSearchRes(res);
    });
  }

  useEffect(() => {
    getPopularRecipes(popularJsonResponse);
    getRecentRecipes(recentJsonResponse);
  }, []);

  return (
    <>
      <div className="parallax">
          <Form className="d-flex flex-column align-items-center searchBox">
            <FormControl
              type="search"
              placeholder="Enter recipe name"
              className="mr-2 mb-3 w-50"
              aria-label="Search"
              onChange={(e) => setSearchStr(e.target.value)}
            />
            <Button style={{width:"20%"}} variant="danger" onClick={searchForRecipe}>
              Search
            </Button>
          </Form>
      </div>
      <Container>
        <Row>
          <Col className="mt-3"></Col>
        </Row>
        <Row>
          <Col>
            <h3>search results</h3>
          </Col>
        </Row>
        <Row>
          {searchRes?.map((recipe) => (
            <Col>
              <RecipeCard
                userId={recipe.user_id}
                recipeName={recipe.recipe_name}
                recipeId={recipe.id}
                recipeImg={recipe.img_path}
              ></RecipeCard>
            </Col>
          ))}
        </Row>
        <Row className="mt-5">
          <Col>
            <h3>Most Popular</h3>
          </Col>
        </Row>
        <Row xl={4} lg={2} xs={1}>
          {mostPopularRecipes.map((recipe) => (
            <Col>
              <RecipeCard
                userId={recipe.user_id}
                recipeName={recipe.recipe_name}
                recipeId={recipe.id}
                recipeImg={recipe.img_path}
              ></RecipeCard>
            </Col>
          ))}
        </Row>
        <Row className="mt-5">
          <Col>
            <h3>Most Recent</h3>
          </Col>
        </Row>
        <Row xl={4} lg={2} s={1} className="mb-5">
          {mostRecentRecipes.map((recipe) => (
            <Col>
              <RecipeCard
                userId={recipe.user_id}
                recipeName={recipe.recipe_name}
                recipeId={recipe.id}
                recipeImg={recipe.img_path}
              ></RecipeCard>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
