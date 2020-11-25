import React from 'react';
import styles from './index.less';
import { Button, Carousel, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
export default () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://neuronthemes.com/centaurus/wp-content/uploads/revslider/classic-slider1/home-classic-slide-2.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://neuronthemes.com/centaurus/wp-content/uploads/revslider/classic-slider1/home-classic-slide-2.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://neuronthemes.com/centaurus/wp-content/uploads/revslider/classic-slider1/home-classic-slide-2.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <section>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h1>Our Works</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={6}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non
            purus nisl. Morbi vitae vulputate enim, in sagittis nisi. Etiam
            luctus odio odio nulla sed.
          </Col>
        </Row>
      </section>
    </div>
  );
};
