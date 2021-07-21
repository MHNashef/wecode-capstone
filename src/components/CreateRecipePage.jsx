import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useRecipe } from "../RecipeContext";
import { getCurrentUser } from "../DAL/userApi";
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
  updateRecipe,
  createRecipe,
  uploadRecipeImage,
  getRecipeById,
  getMealTypes,
  getDietTypes,
  getRecipeMealType,
  getRecipeDietType,
  getRecipeInstructions,
  getRecipeIngredients,
} from "../DAL/api";
import { MdDelete } from "react-icons/md";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";

export default function CreateRecipePage() {
  const stepNumRef = useRef(null);
  const instructionRef = useRef(null);
  const amountRef = useRef(null);
  const measurementRef = useRef(null);
  const ingredientRef = useRef(null);
  const notesRef = useRef(null);

  const history = useHistory();
  const { rid } = useParams();
  const [ctxRecipe] = useRecipe();
  const [recipeImg, setRecipeImg] = useState(null);
  const [measurements, setMeasurements] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [mealTypes, setMealTypes] = useState([]);
  const [dietTypes, setDietTypes] = useState([]);
  const [recipeMealType, setRecipeMealType] = useState([]);
  const [recipeDietType, setRecipeDietType] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [id, setId] = useState(0);
  const [newRecipeId, setNewRecipeId] = useState(0);
  const [editInstructions, setEditInstructions] = useState({
    id,
    step_number: 0,
    step_description: "",
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
    getMealTypes((res) => setMealTypes(res));
    getDietTypes((res) => setDietTypes(res));

    if (ctxRecipe.editMode) {
      getRecipeById((res) => {
        setRecipe(res);
        setRecipeImg({ imgId: res[0].image, imgPath: res[0].img_path });
      }, rid);

      getRecipeMealType((res) => {
        const ret = [];
        res.forEach((element) => {
          ret.push(`${element.meal_type_id}`);
        });
        setRecipeMealType(ret);
      }, rid);

      getRecipeDietType((res) => {
        const ret = [];
        res.forEach((element) => {
          ret.push(`${element.diet_type_id}`);
        });
        setRecipeDietType(ret);
      }, rid);

      getRecipeInstructions((res) => {
        let resid = id;
        res.forEach((element) => {
          element.id = resid++;
        });
        setInstructions(res);
        setId(resid);
        setEditInstructions({ ...editInstructions, id: resid });
      }, rid);

      getRecipeIngredients((res) => {
        let resid = id;
        res.forEach((element) => {
          element.id = resid++;
        });
        setIngredients(res);
        setId(resid);
        setEditIngredients({ ...editIngredients, id: resid });
      }, rid);
    }
  }, []);

  function validate(values) {
    const errors = {};
    if (!values.recipeName) {
      errors.recipeName = "Required";
    }
  }
  const formik = useFormik({
    enableReinitialize: ctxRecipe.editMode,
    initialValues: {
      recipeName: ctxRecipe.editMode ? recipe[0]?.recipe_name : "",
      recipeDescription: ctxRecipe.editMode ? recipe[0]?.general_info : "",
      visibility: ctxRecipe.editMode
        ? recipe[0]?.public.data[0] === 1
          ? "1"
          : "0"
        : "",
      dietType: [...recipeDietType],
      mealType: [...recipeMealType],
      ingredients: [...ingredients],
      instructions: [...instructions],
    },
    validate,
    onSubmit: (values) => {
      values.ingredients = [...ingredients];
      values.instructions = [...instructions];
      values.image = recipeImg?.imgId;
      values.user_id = getCurrentUser()?.id;
      values.recipe_id = rid;
      console.log(values);
      if (ctxRecipe.editMode) {
        updateRecipe(values);
      } else {
        createRecipe(values);
      }
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
      case "step_number":
        setEditInstructions({
          ...editInstructions,
          step_number: Number(value),
        });
        break;
      case "step_description":
        setEditInstructions({ ...editInstructions, step_description: value });
        break;
    }
  }

  function onSelectFile(e) {
    const formData = new FormData();
    formData.append("recipeImg", e.target.files[0], e.target.files[0].name);
    uploadRecipeImage(formData, (response) => {
      setRecipeImg(response);
    });
    // setUpdatePic(!updatePic);
  }

  function removeInstruction(instruction) {
    const newInstructions = instructions.filter(
      (obj) => obj.id !== instruction.id
    );
    setInstructions(newInstructions);
  }
  function removeIngredient(ingredient) {
    const newIngredients = ingredients.filter(
      (obj) => obj.id !== ingredient.id
    );
    setIngredients(newIngredients);
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
    amountRef.current.value = null;
    measurementRef.current.value = "Choose...";
    ingredientRef.current.value = "Choose...";
    notesRef.current.value = "";
    setId(id + 1);
  }

  function handleAddInstruction() {
    setInstructions([...instructions, editInstructions]);
    setEditInstructions({
      id: id + 1,
      step_number: 0,
      step_description: "",
    });
    stepNumRef.current.value = null;
    instructionRef.current.value = "";
    setId(id + 1);
  }

  return (
    <>
      <Container className="mt-5">
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col>
              <Form.Group
                controlId="recipeName"
                {...formik.getFieldProps("recipeName")}
              >
                <Form.Label>Recipe Name </Form.Label>
                <Form.Control
                  value={formik.values.recipeName}
                  type="text"
                  placeholder="Enter recipe name"
                />
              </Form.Group>
            </Col>
            <Col className="d-flex align-items-center">
              <Form.Group>
                <Form.Check
                  type="radio"
                  label="Public"
                  name="visibility"
                  value="1"
                  checked={formik.values.visibility === "1"}
                  inline
                  onChange={formik.handleChange}
                />
                <Form.Check
                  type="radio"
                  label="Private"
                  name="visibility"
                  value="0"
                  checked={formik.values.visibility === "0"}
                  inline
                  onChange={formik.handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Image
                src={`http://localhost:3001/${recipeImg?.imgPath}`}
                rounded
              />
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
              value={formik.values.recipeDescription}
              as="textarea"
              placeholder="short discription about the recipe"
            />
          </Form.Group>

          <Form.Group controlId="dietType">
            <Form.Label className="mr-3 categ-checks">Diet Type:</Form.Label>
            {dietTypes.map((dietType) => (
              <Form.Check
                type="checkbox"
                label={dietType.diet_type_name}
                name="dietType"
                value={dietType.id}
                onChange={formik.handleChange}
                checked={formik.values.dietType.includes(`${dietType.id}`)}
                id={dietType.id}
                inline
              />
            ))}
          </Form.Group>
          <Form.Group controlId="mealType">
            <Form.Label className="mr-3 categ-checks">Meal Type:</Form.Label>
            {mealTypes.map((mealType) => (
              <Form.Check
                type="checkbox"
                label={mealType.meal_type_name}
                name="mealType"
                value={mealType.id}
                onChange={formik.handleChange}
                checked={formik.values.mealType.includes(`${mealType.id}`)}
                id={mealType.id}
                inline
              />
            ))}
          </Form.Group>
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Add Ingredients
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Form.Group>
                    <Row lg={5} md={2} sm={1} xs={1}>
                      <Col >
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                          ref={amountRef}
                          type="number"
                          min="1"
                          onChange={(e) => onChangeIngredient(e, "amount")}
                        />
                      </Col>
                      <Col>
                        <Form.Label>Measurement</Form.Label>
                        <Form.Control
                          ref={measurementRef}
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
                          ref={ingredientRef}
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
                      <Col >
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                          ref={notesRef}
                          type="text"
                          onChange={(e) => onChangeIngredient(e, "notes")}
                        />
                      </Col>
                      <Col className="d-flex align-items-end add-btn">
                        <Button
                          variant="danger"
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
                            <MdDelete
                              onClick={() => removeIngredient(ingredient)}
                            />
                          </td>
                          <td>{ingredient.amount}</td>
                          <td>
                            {
                              measurements[ingredient.measurement_id - 1]
                                ?.measurement_name
                            }
                          </td>
                          <td>
                            {
                              ingredientsList[ingredient.ingredient_id - 1]
                                ?.ingredient_name
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
                Add Cooking Instructions
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <Form.Group>
                    <Row lg={3} md={2} sm={1} xs={1}>
                      <Col >
                        <Form.Label>Step #</Form.Label>
                        <Form.Control
                          ref={stepNumRef}
                          type="number"
                          min="1"
                          onChange={(e) =>
                            onChangeInstruction(e, "step_number")
                          }
                        />
                      </Col>
                      <Col>
                        <Form.Label>Instruction</Form.Label>
                        <Form.Control
                          ref={instructionRef}
                          as="textarea"
                          onChange={(e) =>
                            onChangeInstruction(e, "step_description")
                          }
                        />
                      </Col>
                      <Col className="d-flex align-items-end add-btn">
                        <Button
                          variant="danger"
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
                          <td>{instruction.step_number}</td>
                          <td>{instruction.step_description}</td>
                        </tr>
                      )) || null}
                    </tbody>
                  </Table>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <Button
            variant="danger"
            type="submit"
            className="d-block mx-auto btn-success w-25 mt-5 mb-5"
          >
            {ctxRecipe.editMode ? "Save" : "Create"}
          </Button>
        </Form>
      </Container>
    </>
  );
}
