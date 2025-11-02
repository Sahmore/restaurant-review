/* AUTO-FIX CHECKED: potential delimiter imbalance. Please review. */
import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ size = 'lg', onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ term: searchTerm, location });
    } else {
      navigate('/search', { 
        state: { searchParams: { term: searchTerm, location } }
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className={`g-2 ${size === 'lg' ? 'align-items-end' : 'align-items-center'}`}>
        <Col md={size === 'lg' ? 5 : 4}>
          <Form.Label className={size === 'lg' ? 'h5' : ''}>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city or address"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            size={size}
          />
        </Col>
        <Col md={size === 'lg' ? 5 : 4}>
          <Form.Label className={size === 'lg' ? 'h5' : ''}>What are you looking for?</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g., Italian, pizza, burgers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size={size}
          />
        </Col>
        <Col md={size === 'lg' ? 2 : 4}>
          <Button 
            variant="primary" 
            type="submit" 
            className={`w-100 ${size === 'lg' ? 'py-3' : ''}`}
          >
            <i className="fas fa-search me-2"></i>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBar;