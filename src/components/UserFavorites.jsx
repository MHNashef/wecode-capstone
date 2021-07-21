import React from "react";
import { Container } from "react-bootstrap";

export default function UserFavorites() {
  return (
    <>
      <div class="jumbotron jumbotron-fluid jumbo-bg">
        <div class="container">
          <h1 class="display-4" style={{ fontWeight: "800" }}>
            Your Favorites
          </h1>
          {/* <p class="lead">
            This is a modified jumbotron that occupies the entire horizontal
            space of its parent.
          </p> */}
        </div>
      </div>
      <Container></Container>
    </>
  );
}
