import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { getDietTypes } from "../DAL/api";
import { userSignup } from "../DAL/userApi";
import {
  Form,
  Button,
  Container,
  Alert,
  Card,
  Spinner,
} from "react-bootstrap";
import { useFormik } from "formik";
import { useAuth } from "../AuthContext";
import {
  getCurrentUser,
  getUserById,
  getUserDiet,
  updateUser,
} from "../DAL/userApi";
import Footer from "./Footer.jsx";

export default function Signup() {
  const [auth, setAuth] = useAuth();
  const passwordFieldRef = useRef(null);
  const [dietTypes, setDietTypes] = useState([]);
  const history = useHistory(null);
  const [signup, setSignup] = useState(-1); // a tri-state flag
  const [currUser, setCurrUser] = useState([]);
  const [userDiet, setUserDiet] = useState([]);
  const localUserInfo = getCurrentUser();
  const [spinnerOn, setSpinnerOn] = useState(true);
  const [userUpdated, setUserUpdated] = useState(false);
  const [updatedSpinner, setUpdatedSpinner] = useState(false);

  function onUserRes(response) {
    setCurrUser(response);
  }

  useEffect(() => {
    setTimeout(() => {
      setSpinnerOn(false);
    }, 1000);
    if (auth) {
      getUserById(onUserRes, localUserInfo.id);
      getUserDiet((res) => {
        const temp = [];
        res.forEach((element) => {
          temp.push(`${element.diet_type_id}`);
        });
        setUserDiet(temp);
      }, localUserInfo.id);
    }
    getDietTypes((data) => {
      setDietTypes(data);
    });

    console.log("useEffect: " + signup);
  }, []);

  console.log(currUser);
  console.log(localUserInfo);
  console.log(userDiet);

  function togglePasswordVisibilty() {
    passwordFieldRef.current.type =
      passwordFieldRef.current.type === "password" ? "text" : "password";
  }

  function validate(values) {
    const errors = {};
    const reqd = "Required";

    if (!values.first_name) {
      errors.first_name = reqd;
    } else if (values.first_name.length > 10) {
      errors.first_name = "must be 10 characters or less";
    }

    if (!values.last_name) {
      errors.last_name = reqd;
    } else if (values.last_name.length > 15) {
      errors.first_name = "must be 15 characters or less";
    }

    if (!values.email) {
      errors.email = reqd;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.user_password) {
      errors.user_password = reqd;
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i.test(
        values.user_password
      )
    ) {
      errors.user_password = "Invalid password";
    }

    return errors;
  }

  const formik = useFormik({
    enableReinitialize: auth,
    initialValues: {
      id: auth ? currUser[0]?.id : "",
      first_name: auth ? currUser[0]?.first_name : "",
      last_name: auth ? currUser[0]?.last_name : "",
      email: auth ? currUser[0]?.email : "",
      user_password: auth ? currUser[0]?.user_password : "",
      diettype: [...userDiet],
    },
    validate,
    onSubmit: (values) => {
      if (auth) {
        updateUser((res) => {
          console.log(res.msg);
        }, values);
        setUserUpdated(true);
        setUpdatedSpinner(true);
        setTimeout(() => {
          history.push("/");
        }, 1000);
      } else {
        userSignup((resData) => {
          if (resData?.msg === "User created") {
            setSignup(1);
            setTimeout(() => {
              history.push("/login");
            }, 3000);
          } else {
            setSignup(0);
          }
        }, values);
      }
    },
  });

  return (
    <>
      {spinnerOn ? (
        <Spinner
          className="spinner"
          animation="border"
          role="status"
          variant="danger"
        />
      ) : (
        <>
        <Container className="mt-5 mb-5">
          <Card className="form-card mx-auto">
            <Card.Body>
              {auth ? (
                <h1
                  className="text-center"
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontWeight: "800",
                  }}
                >
                  Edit Profile
                </h1>
              ) : (
                <h1
                  className="text-center"
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontWeight: "800",
                  }}
                >
                  Welcome to Recipe Book
                </h1>
              )}
              {auth ? (
                <h2
                  className="text-center pb-5"
                  style={{
                    color: "#7d8ca3",
                    width: "100%",
                    fontSize: "14pt",
                  }}
                >
                  Feel free to make changes to your user info
                </h2>
              ) : (
                <h2
                  className="text-center pb-5"
                  style={{
                    color: "#7d8ca3",
                    width: "100%",
                    fontSize: "14pt",
                  }}
                >
                  We're excited you're here!
                </h2>
              )}

              <Form onSubmit={formik.handleSubmit}>
                {userUpdated ? (
                  <Alert variant="success">Your changes have been saved</Alert>
                ) : null}
                <Form.Group controlId="first_name">
                  <Form.Control
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    {...formik.getFieldProps("first_name")}
                    isValid={
                      formik.touched.first_name && !formik.errors.first_name
                    }
                  />
                  {formik.touched.first_name && formik.errors.first_name ? (
                    <div className="text-danger">
                      {formik.errors.first_name}
                    </div>
                  ) : null}
                </Form.Group>
                <Form.Group controlId="last_name">
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    {...formik.getFieldProps("last_name")}
                    isValid={
                      formik.touched.last_name && !formik.errors.last_name
                    }
                  />
                  {formik.touched.last_name && formik.errors.last_name ? (
                    <div className="text-danger">{formik.errors.last_name}</div>
                  ) : null}
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    {...formik.getFieldProps("email")}
                    isValid={formik.touched.email && !formik.errors.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger">{formik.errors.email}</div>
                  ) : null}
                </Form.Group>
                <Form.Group controlId="user_password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    {...formik.getFieldProps("user_password")}
                    ref={passwordFieldRef}
                    isValid={
                      formik.touched.user_password &&
                      !formik.errors.user_password
                    }
                  />
                  {formik.touched.user_password &&
                  formik.errors.user_password ? (
                    <div className="text-danger">
                      {formik.errors.user_password}
                    </div>
                  ) : (
                    <Form.Text className="text-muted">
                      Minimum 8 characters
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group controlId="showPasswordCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="show password"
                    onClick={togglePasswordVisibilty}
                  />
                </Form.Group>
                <Form.Group controlId="diettype">
                  <Form.Label className="mr-3" style={{ display: "block" }}>
                    Your diet preferences:
                  </Form.Label>
                  {dietTypes?.map((dtype) => (
                    <Form.Check
                      type="checkbox"
                      checked={formik.values.diettype.includes(`${dtype.id}`)}
                      label={dtype.diet_type_name}
                      id={dtype.id}
                      value={dtype.id}
                      name="diettype"
                      onChange={formik.handleChange}
                      inline
                    />
                  )) || null}
                </Form.Group>
                {signup === -1 ? <Alert></Alert> : null}

                {signup === 1 ? (
                  <Alert key="alert" variant="success">
                    You're all set! We'll now take you to the login page
                  </Alert>
                ) : null}
                {signup === 0 ? (
                  <Alert key="alert" variant="danger">
                    Signup failed. Please try again
                  </Alert>
                ) : null}
                {auth ? (
                  <Button
                    style={{ fontWeight: "800" }}
                    variant="danger"
                    type="submit"
                    className="d-block mx-auto btn-success w-25"
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    style={{ fontWeight: "800" }}
                    variant="danger"
                    type="submit"
                    className="d-block mx-auto btn-success w-50"
                  >
                    Sign Up
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Container>
        <Footer />
        </>
      )}
    </>
  );
}
