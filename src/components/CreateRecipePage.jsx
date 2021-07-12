import React from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Accordion,
  Card,
  Badge,
} from "react-bootstrap";

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

          <Form.Group controlId="dietType">
            <Form.Label className="mr-3">Diet Type:</Form.Label>
            <Form.Check type="checkbox" label="Vegan" id="1" inline />
            <Form.Check type="checkbox" label="Vegetarian" id="2" inline />
            <Form.Check type="checkbox" label="Kosher" id="3" inline />
            <Form.Check type="checkbox" label="Lactose Free" id="4" inline />
            <Form.Check type="checkbox" label="Halal" id="5" inline />
            <Form.Check type="checkbox" label="Gluten Free" id="6" inline />
          </Form.Group>
          <Form.Group controlId="mealType">
            <Form.Label className="mr-3">Meal Type:</Form.Label>
            <Form.Check type="checkbox" label="Breakfast" id="1" inline />
            <Form.Check type="checkbox" label="Lunch" id="2" inline />
            <Form.Check type="checkbox" label="Dinner" id="3" inline />
            <Form.Check type="checkbox" label="Snack" id="4" inline />
            <Form.Check type="checkbox" label="Dessert" id="5" inline />
            <Form.Check type="checkbox" label="Smoothie" id="6" inline />
            <Form.Check type="checkbox" label="Pastries" id="7" inline />
          </Form.Group>
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                <Badge pill variant="primary">
                  Add Ingredients
                </Badge>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Form.Group>
                    <Row>
                      <Col className="col-2">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="text" />
                      </Col>
                      <Col>
                        <Form.Label>Measurement</Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                          <option>Choose...</option>
                          <option>gram</option>
                          <option>kilogram</option>
                          <option>millileter</option>
                          <option>table spoon</option>
                          <option>table spoons</option>
                          <option>tea spoons</option>
                          <option>quart</option>
                          <option>quarts</option>
                          <option>cup</option>
                          <option>cups</option>
                          <option>pack</option>
                          <option>packs</option>
                          <option>unit</option>
                          <option>units</option>
                          <option>slice</option>
                          <option>slices</option>
                        </Form.Control>
                      </Col>
                      <Col>
                        <Form.Label>Ingredient</Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                          <option>Choose...</option>
                          <option>cheddar cheese</option>
                          <option>tomato</option>
                          <option>sliced bread</option>
                          <option>milk</option>
                          <option>oatmeal</option>
                          <option>honey</option>
                        </Form.Control>
                      </Col>
                      <Col className="col-3">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control type="text" />
                      </Col>
                      <Col>
                        <Button>Add</Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                <Badge pill variant="primary">
                  Add Cooking Instructions
                </Badge>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <Form.Group>
                    <Row>
                      <Col className="col-2">
                        <Form.Label>Step #</Form.Label>
                        <Form.Control type="text" />
                      </Col>
                      <Col >
                        <Form.Label>Instruction</Form.Label>
                        <Form.Control type="text" />
                      </Col>
                      <Col>
                        <Button>Add</Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <Button
            variant="primary"
            type="submit"
            className="d-block mx-auto btn-success w-25 mt-5"
          >
            Create
          </Button>
        </Form>
      </Container>
    </>
  );
}
