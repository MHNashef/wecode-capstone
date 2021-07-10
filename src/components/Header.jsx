import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import React, { useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import AuthApi from "../AuthApi";

export default function Header() {
  const Auth = useContext(AuthApi);
  const history = useHistory(null);

  function handleLogout() {
    // console.log("handle logout");
    Auth.setAuth(false);
    Cookies.remove("sessionId");
    // history.push("/");
  }

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="md"
        bg="dark"
        variant="dark"
        className="mb-3"
      >
        <Container>
          <Navbar.Brand href="#home" style={{ fontWeight: "800" }}>
            Recipe Book
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#allRecipes">All Recipes</Nav.Link>
              {Auth.auth ? (
                <Nav.Link href="/createRecipe">Create Recipe</Nav.Link>
              ) : null}
            </Nav>
            <Nav>
              <Nav.Link href="#signup">Sign Up</Nav.Link>
              {!Auth.auth ? (
                <Nav.Link href="/login">Login</Nav.Link>
              ) : (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
