/* AUTO-FIX CHECKED: potential delimiter imbalance. Please review. */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 py-4">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Restaurant Reviews</h5>
            <p>Discover and share your dining experiences.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <p>&copy; 2024 Restaurant Reviews. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;