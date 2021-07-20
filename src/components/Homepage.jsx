import React, { useEffect, useState } from "react";
import {
  Carousel,
  Container,
  Col,
  Row,
  Form,
  FormControl,
  Button,
  Pagination,
} from "react-bootstrap";
import "../styles/Homepage.css";
import RecipeCard from "./RecipeCard";
import {
  getRecentRecipes,
  getPopularRecipes,
  getSearchRes,
  getRecipes,
  getRecipesPaged,
} from "../DAL/api";

export default function Homepage() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [mostPopularRecipes, setMostPopularRecipes] = useState([]);
  const [mostRecentRecipes, setMostRecentRecipes] = useState([]);
  const [searchRes, setSearchRes] = useState([]);
  const [searchStr, setSearchStr] = useState("");
// paging stuff
const [pageItems, setPageItems] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const maxPageResults = 3;
let resultCount = 0;

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
  function onPageItem(pageid) {
    const lastPage = Math.ceil(resultCount / maxPageResults);
    let clickedPage;

    switch (pageid) {
      case "firstPage":
        clickedPage = 1;
        break;
      case "prevPage":
        clickedPage = currentPage - 1;
        break;
      case "nextPage":
        clickedPage = currentPage + 1;
        break;
      case "lastPage":
        clickedPage = lastPage;
        break;
      default:
        clickedPage = Number(pageid);
    }
    clickedPage = clickedPage < 1 ? 1: clickedPage;
    clickedPage = clickedPage > lastPage? lastPage: clickedPage;

    setCurrentPage(clickedPage);
  }

  function buildPageItems(resCount) {
    const maxRangeLength = 3;
    const tempItems = [];
    const numberOfItems = Math.ceil(resCount / maxPageResults); // this is the last page
    const numberOfRanges = Math.ceil(numberOfItems / maxRangeLength);
    const currentRange = Math.ceil(currentPage / maxRangeLength);
    const rangeFirstPage = 1 + (currentRange - 1) * maxRangeLength;
    const rangeLastPage = Math.min(
      currentRange * maxRangeLength,
      numberOfItems
    );

    tempItems.push(
      <Pagination.First
        onClick={() => {
          onPageItem("firstPage");
        }}
        disabled={currentPage === 1}
      />
    );
    tempItems.push(
      <Pagination.Prev
        onClick={() => {
          onPageItem("prevPage");
        }}
        disabled={currentPage === 1}
      />
    );

    for (let numItem = rangeFirstPage; numItem <= rangeLastPage; numItem++) {
      tempItems.push(
        <Pagination.Item
          id={numItem}
          onClick={
            numItem !== currentPage ? (e) => onPageItem(e.target.id) : null
          }
          key={numItem}
          active={numItem === currentPage}
        >
          {numItem}
        </Pagination.Item>
      );
    }

    tempItems.push(
      <Pagination.Next
        onClick={() => {
          onPageItem("nextPage");
        }}
        disabled={numberOfItems === currentPage}
      />
    );
    tempItems.push(
      <Pagination.Last
        onClick={() => {
          onPageItem("lastPage");
        }}
        disabled={numberOfItems === currentPage}
      />
    );

    setPageItems(tempItems);
  }
  useEffect(() => {
    getPopularRecipes(popularJsonResponse);
    getRecentRecipes(recentJsonResponse);
    getRecipes((res) => {
      resultCount = res[0].count;
      
      if (maxPageResults >= resultCount) {
        getRecipes((res) => {
          setAllRecipes(res);
        });
      } else {
        // get paginated results
        getRecipesPaged(
          (res) => {
            setAllRecipes(res);
            buildPageItems(resultCount);
          },
          maxPageResults,
          currentPage
        );
      }
    }, true);
  }, [currentPage]);

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
          <Button
            style={{ width: "20%" }}
            variant="danger"
            onClick={searchForRecipe}
          >
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
          {/* {mostPopularRecipes.map((recipe) => (
            <Col>
              <RecipeCard
                userId={recipe.user_id}
                recipeName={recipe.recipe_name}
                recipeId={recipe.id}
                recipeImg={recipe.img_path}
              ></RecipeCard>
            </Col>
          ))} */}
        </Row>
        <Row className="mt-5">
          <Col>
            <h3>Most Recent</h3>
          </Col>
        </Row>
        <Row xl={4} lg={2} s={1} className="mb-5">
          {/* {mostRecentRecipes.map((recipe) => (
            <Col>
              <RecipeCard
                userId={recipe.user_id}
                recipeName={recipe.recipe_name}
                recipeId={recipe.id}
                recipeImg={recipe.img_path}
              ></RecipeCard>
            </Col>
          ))} */}
        </Row>
        <Row xl={4} lg={2} xs={1}>
          {allRecipes.map((recipe) => (
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
        <Row>
          <Pagination>{pageItems}</Pagination>
        </Row>
      </Container>
    </>
  );
}
