import React from "react";
import { Carousel, Container, Col, Row } from "react-bootstrap";
import "../styles/Homepage.css";
import RecipeCard from "./RecipeCard";

export default function Homepage() {
  return (
    <>
      <Container>
        <Carousel fade controls={false}>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img"
              src="https://images.unsplash.com/photo-1614277786110-1a64e457c4c3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGZvb2QlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Welcome, (username)</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img"
              src="https://images.unsplash.com/photo-1615653633551-25dd80d2765a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Welcome, (username)</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img"
              src="https://images.unsplash.com/photo-1614277786539-abd7a3cd46bf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGZvb2QlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Welcome, (username)</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <Row className="mt-5">
          <Col>
            <h3>Most Popular</h3>
          </Col>
        </Row>
        <Row xl={4} lg={2} xs={1}>
          <Col>
            <RecipeCard />
          </Col>
          <Col>
            <RecipeCard />
          </Col>
          <Col>
            <RecipeCard />
          </Col>
          <Col>
            <RecipeCard />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h3>Most Recent</h3>
          </Col>
        </Row>
        <Row xl={4} lg={2} s={1} className="mb-5">
          <Col>
            <RecipeCard />
          </Col>
          <Col>
            <RecipeCard />
          </Col>
          <Col>
            <RecipeCard />
          </Col>
          <Col>
            <RecipeCard />
          </Col>
        </Row>
      </Container>
    </>
  );
}
