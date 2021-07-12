import React, { useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useAuth } from "../AuthContext";

export default function Login() {
  const passwordFieldRef = useRef(null);
  const [auth, setAuth] = useAuth();

  function togglePasswordVisibilty() {
    const passwordField = passwordFieldRef.current;
    if (passwordField.type === "password") {
      passwordField.type = "text";
    } else {
      passwordField.type = "password";
    }
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
      if (!auth) {
        setAuth(true);
        Cookies.set("sessionid", "1234567");
      }
      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Container>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
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
            <Form.Label>Password</Form.Label>
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
            className="btn-success d-block mx-auto w-25"
            variant="primary"
            type="submit"
          >
            Login
          </Button>
        </Form>
      </Container>
    </>
  );
}
