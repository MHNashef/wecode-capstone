import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Accordion,
  Card,
  Badge,
  Table,
} from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { useFormik } from "formik";

export default function CreateRecipePage() {
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [id, setId] = useState(0);
  const [editInstructions, setEditInstructions] = useState([
    {
      id,
      stepNum: "",
      instruction: "",
    },
  ]);
  const [editIngredients, setEditIngredients] = useState({
    id,
    amount: "",
    measurement: "",
    ingredient: "",
    notes: "",
  });

  function validate(values) {
    const errors = {};
    if (!values.recipeName) {
      errors.recipeName = "Required";
    }
  }
  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      recipeName: "",
      recipeDescription: "",
      diet: [],
      ingredients: [...ingredients],
      instructions: [...instructions],
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  function onChangeIngredient({ target: { value } }, field) {
    switch (field) {
      case "amount":
        setEditIngredients({ ...editIngredients, amount: value });
        break;
      case "measurement":
        setEditIngredients({ ...editIngredients, measurement: value });
        break;
      case "ingredient":
        setEditIngredients({ ...editIngredients, ingredient: value });
        break;
      case "notes":
        setEditIngredients({ ...editIngredients, notes: value });
        break;
    }
  }

  function onChangeInstruction({ target: { value } }, field) {
    switch (field) {
      case "stepNum":
        setEditInstructions({ ...editInstructions, stepNum: value });
        break;
      case "instruction":
        setEditInstructions({ ...editInstructions, instruction: value });
        break;
    }
  }

  function removeInstruction(instruction) {
    console.log(instruction[0].id);
  }

  function handleAddIngredient() {
    setIngredients([...ingredients, editIngredients]);
    setEditIngredients({
      id: id + 1,
      amount: "",
      measurement: "",
      ingredient: "",
      notes: "",
    });
    setId(id + 1);
  }

  function handleAddInstruction() {
    setInstructions([...instructions, editInstructions]);
    setEditInstructions({
      id: id + 1,
      stepNum: "",
      instruction: "",
    });
    setId(id + 1);
  }

  return (
    <>
      <Container>
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="recipeName" {...formik.getFieldProps("recipeName")} >
                <Form.Label>Recipe Name</Form.Label>
                <Form.Control type="text" placeholder="Enter recipe name" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.File id="image" label="Upload Image" />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="recipeDescription" {...formik.getFieldProps("recipeDescription")}>
            <Form.Label>Recipe Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="short discription about the recipe"
            />
          </Form.Group>

          <Form.Group controlId="dietType">
            <Form.Label className="mr-3">Diet Type:</Form.Label>
            <Form.Check type="checkbox" label="Vegan" id="1" name="diet" inline />
            <Form.Check type="checkbox" label="Vegetarian" id="2" name="diet" inline />
            <Form.Check type="checkbox" label="Kosher" id="3" name="diet" inline />
            <Form.Check type="checkbox" label="Lactose Free" name="diet" id="4" inline />
            <Form.Check type="checkbox" label="Halal" id="5" name="diet" inline />
            <Form.Check type="checkbox" label="Gluten Free" name="diet" id="6" inline />
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
                        <Form.Control
                          type="number"
                          onChange={(e) => onChangeIngredient(e, "amount")}
                        />
                      </Col>
                      <Col>
                        <Form.Label>Measurement</Form.Label>
                        <Form.Control
                          as="select"
                          defaultValue="Choose..."
                          onChange={(e) => onChangeIngredient(e, "measurement")}
                        >
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
                        <Form.Control
                          as="select"
                          defaultValue="Choose..."
                          onChange={(e) => onChangeIngredient(e, "ingredient")}
                        >
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
                        <Form.Control
                          type="text"
                          onChange={(e) => onChangeIngredient(e, "notes")}
                        />
                      </Col>
                      <Col>
                        <Button onClick={handleAddIngredient}>Add</Button>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Table striped borderless size="sm">
                    <tbody>
                      {ingredients.map((ingredient) => (
                        <tr>
                          <td style={{ width: "10%" }}>
                            <MdDelete />
                          </td>
                          <td>{ingredient.amount}</td>
                          <td>{ingredient.measurement}</td>
                          <td>{ingredient.ingredient}</td>
                          <td>{ingredient.notes}</td>
                        </tr>
                      )) || null}
                    </tbody>
                  </Table>
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
                        <Form.Control
                          type="number"
                          onChange={(e) => onChangeInstruction(e, "stepNum")}
                        />
                      </Col>
                      <Col>
                        <Form.Label>Instruction</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            onChangeInstruction(e, "instruction")
                          }
                        />
                      </Col>
                      <Col>
                        <Button onClick={handleAddInstruction}>Add</Button>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Table striped borderless size="sm">
                    <tbody>
                      {instructions.map((instruction) => (
                        <tr >
                          <td style={{ width: "10%" }}>
                              <MdDelete onClick={() => removeInstruction(instruction)} />
                          </td>
                          <td>{instruction.stepNum}</td>
                          <td>{instruction.instruction}</td>
                        </tr>
                      )) || null}
                    </tbody>
                  </Table>
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