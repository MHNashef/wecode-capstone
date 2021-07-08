import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

export default function RecipePage() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1 style={{fontWeight:"800"}}>Recipe Name</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="lead">Recipe general info</p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h2 style={{fontSize:"1.5rem", fontWeight:"800"}}>Ingredients</h2>
            <ListGroup variant="flush">
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <h2 style={{fontSize:"1.5rem", fontWeight:"800"}}>Preparation</h2>
            <ListGroup variant="flush">
              <ListGroup.Item><span style={{fontWeight:"800"}} className="mr-4">1</span>Cras justo odio</ListGroup.Item>
              <ListGroup.Item><span style={{fontWeight:"800"}} className="mr-4">2</span>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item><span style={{fontWeight:"800"}} className="mr-4">3</span>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item><span style={{fontWeight:"800"}} className="mr-4">4</span>Porta ac consectetur ac</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
}
