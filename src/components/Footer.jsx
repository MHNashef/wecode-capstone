import React from "react";
import { Container } from "react-bootstrap";
import { FaLinkedin } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";

export default function Footer() {
  return (
    <footer
      className="footer mt-auto py-2"
      style={{ backgroundColor: "#343a40", color: "white" }}
    >
      <Container>
        <p className="mx-auto my-auto">
          Made by{" "}
          <a
            style={{ color: "#ba3b46", fontWeight: "bold" }}
            href="https://github.com/MHNashef"
          >
            Hisham{" "}
            <span style={{ color: "white", fontWeight: "bolder" }}>|</span>
          </a>
          <a href="https://github.com/MHNashef">
            <AiFillGithub
              className="ml-2"
              style={{ fontSize: "1.5em", color: "white" }}
            />
          </a>
          <a href="https://www.linkedin.com/in/hishamnashef/">
            <FaLinkedin
              className="ml-2"
              style={{ fontSize: "1.5em", color: "white" }}
            />
          </a>
        </p>
      </Container>
    </footer>
  );
}
