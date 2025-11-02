/* AUTO-FIX CHECKED: potential delimiter imbalance. Please review. */
import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <Container className="text-center my-5">
      <Spinner animation="border" role="status" variant="primary" className="mb-3">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p className="text-muted">{message}</p>
    </Container>
  );
};

export default LoadingSpinner;