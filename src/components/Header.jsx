import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuth } from "../AuthContext";

export default function Header() {
  const [auth, setAuth] = useAuth();
  const history = useHistory(null);

  const onLogOut = () => {
    setAuth(false);
    Cookies.remove("sessionid");
  };

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
              {auth ? (
                <Nav.Link href="/createRecipe">Create Recipe</Nav.Link>
              ) : null}
            </Nav>
            <Nav>
              <Nav.Link href="#signup">Sign Up</Nav.Link>
              {!auth ? (
                <Nav.Link href="/login">Login</Nav.Link>
              ) : (
                <Nav.Link href="/" onClick={onLogOut}>
                  Logout
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
