import React, { useState, useEffect } from "react";
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
  Image,
} from "react-bootstrap";
import {
  getMeasurements,
  getIngredients,
  createRecipe,
  uploadRecipeImage,
} from "../DAL/api";
import { MdDelete } from "react-icons/md";
import { useFormik } from "formik";

export default function CreateRecipePage() {
  const [recipeImg, setRecipeImg] = useState(null);
  const [measurements, setMeasurements] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [id, setId] = useState(0);
  const [editInstructions, setEditInstructions] = useState({
    id,
    stepNum: "",
    instruction: "",
  });
  const [editIngredients, setEditIngredients] = useState({
    id,
    amount: "",
    measurement_id: "",
    ingredient_id: "",
    notes: "",
  });

  function measurementJsonResponse(response) {
    setMeasurements(response);
  }

  function ingredientListJsonResponse(response) {
    setIngredientsList(response);
  }

  useEffect(() => {
    getMeasurements(measurementJsonResponse);
    getIngredients(ingredientListJsonResponse);
  }, []);

  function validate(values) {
    const errors = {};
    if (!values.recipeName) {
      errors.recipeName = "Required";
    }
  }
  const formik = useFormik({
    initialValues: {
      recipeName: "",
      recipeDescription: "",
      visibility: "",
      dietType: [],
      mealType: [],
      ingredients: [...ingredients],
      instructions: [...instructions],
    },
    validate,
    onSubmit: (values) => {
      values.ingredients = [...ingredients];
      values.instructions = [...instructions];
      console.log(values);
      createRecipe(values);
    },
  });

  function onChangeIngredient({ target: { value } }, field) {
    switch (field) {
      case "amount":
        setEditIngredients({ ...editIngredients, amount: value });
        break;
      case "measurement":
        setEditIngredients({ ...editIngredients, measurement_id: value });
        break;
      case "ingredient":
        setEditIngredients({ ...editIngredients, ingredient_id: value });
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

  function onSelectFile(e) {
    const formData = new FormData();
    formData.append("recipeImg", e.target.files[0], e.target.files[0].name);
    uploadRecipeImage(formData, (response) => {
      console.log(response);
      setRecipeImg(response.imgPath);
    });
    // setUpdatePic(!updatePic);
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
              <Form.Group
                controlId="recipeName"
                {...formik.getFieldProps("recipeName")}
              >
                <Form.Label>Recipe Name</Form.Label>
                <Form.Control type="text" placeholder="Enter recipe name" />
              </Form.Group>
            </Col>
            <Col className="d-flex align-items-center">
              <Form.Group>
                <Form.Check
                  type="radio"
                  label="Public"
                  name="visibility"
                  value="1"
                  inline
                  onChange={formik.handleChange}
                />
                <Form.Check
                  type="radio"
                  label="Private"
                  name="visibility"
                  value="0"
                  inline
                  onChange={formik.handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Image src={`http://localhost:3001/${recipeImg}`} rounded />
              <Form.Group>
                <Form.File
                  id="image"
                  name="recipeImg"
                  label="Upload Image"
                  onChange={onSelectFile}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group
            controlId="recipeDescription"
            {...formik.getFieldProps("recipeDescription")}
          >
            <Form.Label>Recipe Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="short discription about the recipe"
            />
          </Form.Group>

          <Form.Group controlId="dietType">
            <Form.Label className="mr-3">Diet Type:</Form.Label>
            <Form.Check
              type="checkbox"
              label="Vegan"
              id="1"
              name="dietType"
              value="1"
              onChange={formik.handleChange}
              inline
            />
            <Form.Check
              type="checkbox"
              label="Vegetarian"
              id="2"
              name="dietType"
              value="2"
              onChange={formik.handleChange}
              inline
            />
            <Form.Check
              type="checkbox"
              label="Kosher"
              id="3"
              name="dietType"
              value="3"
              onChange={formik.handleChange}
              inline
            />
            <Form.Check
              type="checkbox"
              label="Lactose Free"
              name="dietType"
              id="4"
              value="4"
              onChange={formik.handleChange}
              inline
            />
            <Form.Check
              type="checkbox"
              label="Halal"
              id="5"
              name="dietType"
              value="5"
              onChange={formik.handleChange}
              inline
            />
            <Form.Check
              type="checkbox"
              label="Gluten Free"
              name="dietType"
              id="6"
              value="6"
              onChange={formik.handleChange}
              inline
            />
          </Form.Group>
          <Form.Group controlId="mealType">
            <Form.Label className="mr-3">Meal Type:</Form.Label>
            <Form.Check
              type="checkbox"
              label="Breakfast"
              name="mealType"
              value="1"
              onChange={formik.handleChange}
              id="1"
              inline
            />
            <Form.Check
              type="checkbox"
              label="Lunch"
              name="mealType"
              value="2"
              onChange={formik.handleChange}
              id="2"
              inline
            />
            <Form.Check
              type="checkbox"
              label="Dinner"
              name="mealType"
              value="3"
              onChange={formik.handleChange}
              id="3"
              inline
            />
            <Form.Check
              type="checkbox"
              label="Snack"
              name="mealType"
              value="4"
              onChange={formik.handleChange}
              id="4"
              inline
            />
            <Form.Check
              type="checkbox"
              label="Dessert"
              name="mealType"
              value="5"
              onChange={formik.handleChange}
              id="5"
              inline
            />
            <Form.Check
              type="checkbox"
              label="Smoothie"
              name="mealType"
              value="6"
              onChange={formik.handleChange}
              id="6"
              inline
            />
            <Form.Check
              type="checkbox"
              label="Pastries"
              name="mealType"
              value="7"
              onChange={formik.handleChange}
              id="7"
              inline
            />
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
                          min="1"
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
                          {measurements.map((unit) => (
                            <option value={unit.id}>
                              {unit.measurement_name}
                            </option>
                          ))}
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
                          {ingredientsList.map((ingredient) => (
                            <option value={ingredient.id}>
                              {ingredient.ingredient_name}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col className="col-3">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => onChangeIngredient(e, "notes")}
                        />
                      </Col>
                      <Col className="d-flex align-items-end">
                        <Button
                          id="instructions"
                          style={{ height: "40px" }}
                          onClick={handleAddIngredient}
                        >
                          Add
                        </Button>
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
                          <td>
                            {
                              measurements[ingredient.measurement_id - 1]
                                .measurement_name
                            }
                          </td>
                          <td>
                            {
                              ingredientsList[ingredient.ingredient_id - 1]
                                .ingredient_name
                            }
                          </td>
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
                          min="1"
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
                      <Col className="d-flex align-items-end">
                        <Button
                          style={{ height: "40px" }}
                          onClick={handleAddInstruction}
                        >
                          Add
                        </Button>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Table striped borderless size="sm">
                    <tbody>
                      {instructions.map((instruction) => (
                        <tr>
                          <td style={{ width: "10%" }}>
                            <MdDelete
                              onClick={() => removeInstruction(instruction)}
                            />
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
            className="d-block mx-auto btn-success w-25 mt-5 mb-5"
          >
            Create
          </Button>
        </Form>
      </Container>
    </>
  );
}
