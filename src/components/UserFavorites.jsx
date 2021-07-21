import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";

export default function UserFavorites() {
  const [spinnerOn, setSpinnerOn] = useState(true);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setSpinnerOn(false);
    }, 1000);
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
        <>
          <div class="jumbotron jumbotron-fluid jumbo-bg">
            <div class="container">
              <h1 class="display-4" style={{ fontWeight: "800" }}>
                Your Favorites
              </h1>
            </div>
          </div>
          <Container></Container>
        </>
      )}
    </>
  );
}
