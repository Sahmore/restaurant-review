/* AUTO-FIX CHECKED: potential delimiter imbalance. Please review. */
import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import RestaurantCard from './RestaurantCard';

const RestaurantList = ({ restaurants, loading, error }) => {
  if (error) {
    return (
      <Alert variant="danger">
        <i className="fas fa-exclamation-triangle me-2"></i>
        {error}
      </Alert>
    );
  }

  if (!restaurants || restaurants.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="fas fa-utensils fa-3x text-muted mb-3"></i>
        <h4>No restaurants found</h4>
        <p className="text-muted">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <Row>
      {restaurants.map(restaurant => (
        <Col key={restaurant.id} xl={4} lg={4} md={6} className="mb-4">
          <RestaurantCard restaurant={restaurant} />
        </Col>
      ))}
    </Row>
  );
};

export default RestaurantList;