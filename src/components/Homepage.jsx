import React, { useEffect, useState } from "react";
import {
  Container,
  Col,
  Row,
  Form,
  FormControl,
  Button,
  Pagination,
  FormGroup,
  Spinner,
} from "react-bootstrap";
import "../styles/Homepage.css";
import RecipeCard from "./RecipeCard";
import {
  getSearchRes,
  getRecipes,
  getRecipesPaged,
  getSearchResPaged,
} from "../DAL/api";

export default function Homepage() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [searchRes, setSearchRes] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [spinnerOn, setSpinnerOn] = useState(true);
  const [sortByMostRecent, setSortByMostRecent] = useState(true);

  // paging stuff
  const [pageItems, setPageItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inSearchMode, setInSearchMode] = useState(false);
  const maxPageResults = 8;
  let resultCount = 0;

  function searchForRecipe() {
    setPageItems([]);
    setInSearchMode(true);
    setCurrentPage(1);
    pagSearch();
  }

  function pagSearch() {
    getSearchRes(
      searchStr,
      (res) => {
        resultCount = res[0].count;
        console.log(res);
        if (maxPageResults >= resultCount) {
          getSearchRes(
            searchStr,
            (res) => {
              setAllRecipes(res);
            },
            sortByMostRecent
          );
        } else {
          // get paginated results
          getSearchResPaged(
            searchStr,
            (res) => {
              setAllRecipes(res);
              buildPageItems(resultCount);
            },
            maxPageResults,
            currentPage,
            sortByMostRecent
          );
        }
      },
      true,
      true
    );
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
    clickedPage = clickedPage < 1 ? 1 : clickedPage;
    clickedPage = clickedPage > lastPage ? lastPage : clickedPage;

    setCurrentPage(clickedPage);
  }

  function buildPageItems(resCount) {
    const maxRangeLength = 5;
    const tempItems = [];
    const numberOfItems = Math.ceil(resCount / maxPageResults); // this is the last page
    const numberOfRanges = Math.ceil(numberOfItems / maxRangeLength);
    const currentRange = Math.ceil(currentPage / maxRangeLength);
    const rangeFirstPage = 1 + (currentRange - 1) * maxRangeLength;
    const rangeLastPage = Math.min(
      currentRange * maxRangeLength,
      numberOfItems
    );

    console.log(currentPage);
    console.log(resCount);
    console.log(rangeFirstPage);
    console.log(numberOfRanges);
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
    setTimeout(() => {
      setSpinnerOn(false);
    }, 1000);
    console.log(inSearchMode);
    if (!searchStr) {
      getRecipes(
        (res) => {
          resultCount = res[0].count;

          if (maxPageResults >= resultCount) {
            getRecipes((res) => {
              setAllRecipes(res);
            }, sortByMostRecent);
          } else {
            // get paginated results
            getRecipesPaged(
              (res) => {
                setAllRecipes(res);
                buildPageItems(resultCount);
              },
              maxPageResults,
              currentPage,
              sortByMostRecent
            );
          }
        },
        true,
        true
      );
    } else if (inSearchMode) {
      pagSearch();
      console.log("useEffect");
    }
  }, [currentPage, searchStr, sortByMostRecent]);

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
        <>
          <div className="parallax">
            <Form className="d-flex flex-column h-100 searchBox">
              <FormGroup>
                <FormControl
                  type="search"
                  placeholder="Search by recipe name"
                  style={{ width: "60%" }}
                  className="mx-auto"
                  aria-label="Search"
                  onChange={(e) => {
                    if (!e.target.value) {
                      setCurrentPage(1);
                    }
                    setSearchStr(e.target.value);
                    setInSearchMode(false);
                  }}
                />
              </FormGroup>
              <Button
                style={{
                  width: "22%",
                  backgroundColor: "#ba3b46",
                  fontWeight: "800",
                }}
                className="mx-auto"
                variant="danger"
                onClick={searchForRecipe}
              >
                Search
              </Button>
            </Form>
          </div>
          <Container className="mt-5">
            <Form.Label className="mr-1">Sort By:</Form.Label>
            <Form.Control
              as="select"
              size="sm"
              style={{display:"inline", width: "15%"}}
              defaultValue="Most Recent"
              onChange={(e) => {
                if (e.target.value === "Most Popular") {
                  setSortByMostRecent(false);
                } else {
                  setSortByMostRecent(true);
                }
              }}
            >
              <option>Most Recent</option>
              <option>Most Popular</option>
            </Form.Control>
            <Row lg={4} md={2} sm={1} xs={1} className="mt-2">
              {allRecipes.map((recipe) => (
                <Col>
                  <RecipeCard
                    userId={recipe.user_id}
                    recipeName={recipe.recipe_name}
                    recipeId={recipe.id}
                    recipeImg={recipe.img_path}
                    recipeViews={recipe.views}
                  ></RecipeCard>
                </Col>
              ))}
            </Row>
            <Row className="mt-5 d-flex justify-content-center">
              <Pagination>{pageItems}</Pagination>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}
