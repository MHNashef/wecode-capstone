import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function CreateRecipePage() {
  return (
    <>
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="recipeName">
                <Form.Label>Recipe Name</Form.Label>
                <Form.Control type="text" placeholder="Enter recipe name" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.File id="exampleFormControlFile1" label="Upload Image" />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Recipe Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="short discription about the recipe"
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="d-block mx-auto btn-success w-25"
          >
            Create
          </Button>
        </Form>
      </Container>
    </>
  );
}
