import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function Header() {
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
            </Nav>
            <Nav>
              <Nav.Link href="#signup">Sign Up</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
