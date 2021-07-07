import React, { useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";

export default function Login() {
  const passwordFieldRef = useRef(null);

  function togglePasswordVisibilty() {
    const passwordField = passwordFieldRef.current;
    if (passwordField.type === "password") {
      passwordField.type = "text";
    } else {
      passwordField.type = "password";
    }
  }

  return (
    <>
      <Container>
        <Form>
          <Form.Group controlId="userEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="userPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passwordFieldRef}
            />
          </Form.Group>
          <Form.Group controlId="showPasswordCheckbox">
            <Form.Check
              type="checkbox"
              label="show password"
              onClick={togglePasswordVisibilty}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    </>
  );
}
