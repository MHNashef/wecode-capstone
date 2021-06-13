import React from "react";
import { Container, Navbar, Nav, Row, Col, Form } from "react-bootstrap";

export default function Homepage() {
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
          <Navbar.Brand href="#home">Recipe Book</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#allRecipes">All Recipes</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#login">Login</Nav.Link>
              <Nav.Link href="#signup">Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <h1>Recipes</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Sort By:</h4>
          </Col>
          <Col>
            <Form>
              <Form.Group>
                <Form.Check
                  inline
                  label="Most Popular"
                  name="sortBy"
                  type="radio"
                />
                <Form.Check
                  inline
                  label="Most Recent"
                  name="sortBy"
                  type="radio"
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
