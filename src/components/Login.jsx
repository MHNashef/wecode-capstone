import React, { useRef, useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useAuth } from "../AuthContext";
import { userLogin } from "../DAL/userApi";

export default function Login() {
  const passwordFieldRef = useRef(null);
  const [auth, setAuth] = useAuth();
  const [attemptFailedError, setAttemptFailedError] = useState(false);

  function togglePasswordVisibilty() {
    passwordFieldRef.current.type =
      passwordFieldRef.current.type === "password" ? "text" : "password";
  }

  function validate(values) {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      userLogin((currentUser) => {
        if (currentUser) {
          Cookies.set("currentuser", currentUser);
          setAuth(true);
        } else {
          setAttemptFailedError(true);
          console.log("user login failed");
        }
      }, values);
    },
  });

  return (
    <>
      <Container className="mt-5">
        <Card className="form-card mx-auto">
          <Card.Body>
            <h1
              className="text-center"
              style={{ fontWeight: "800", padding: "10px"}}
            >
              Login
            </h1>
            <h2
              className="text-center pb-5"
              style={{ fontSize: "14pt", color: "#7d8ca3" }}
            >
              Welcome Back!
            </h2>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group controlId="email">
                {/* <Form.Label>Email address</Form.Label> */}
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...formik.getFieldProps("email")}
                  isValid={formik.touched.email && !formik.errors.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
              </Form.Group>

              <Form.Group controlId="password">
                {/* <Form.Label>Password</Form.Label> */}
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...formik.getFieldProps("password")}
                  ref={passwordFieldRef}
                  isValid={formik.touched.password && !formik.errors.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="showPasswordCheckbox">
                <Form.Check
                  type="checkbox"
                  label="show password"
                  onClick={togglePasswordVisibilty}
                />
              </Form.Group>
              <Button
                className="btn-success d-block mx-auto w-50"
                variant="primary"
                type="submit"
              >
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
