import React from "react";
import { Carousel } from "react-bootstrap";
import './Homepage.css';

export default function Homepage() {
  return (
    <>
      <Carousel fade controls={false}>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Welcome, (username)</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Welcome, (username)</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://images.unsplash.com/photo-1587502537745-84b86da1204f?ixid=MnwxMjA3fDF8MHxzZWFyY2h8OHx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Welcome, (username)</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}
