/* AUTO-FIX CHECKED: potential delimiter imbalance. Please review. */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, Badge } from 'react-bootstrap';
import RestaurantCard from '../components/restaurants/RestaurantCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { restaurantsAPI } from '../services/api';

const RestaurantSearch = () => {
  const [searchParams, setSearchParams] = useState({
    term: '',
    priceFilter: '',
    ratingFilter: 0
  });
  const [restaurants, setRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load all restaurants on component mount
  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      const response = await restaurantsAPI.search({});
      const data = response.data.data || [];
      setAllRestaurants(data);
      setRestaurants(data);
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load restaurants');
    } finally {
      setLoading(false);
    }
  };

  // Filter restaurants based on search params
  useEffect(() => {
    if (!allRestaurants.length) return;

    let filtered = [...allRestaurants];

    // Filter by search term
    if (searchParams.term) {
      const terms = searchParams.term.toLowerCase().split(' ');
      filtered = filtered.filter(restaurant => {
        const searchText = [
          restaurant.name,
          restaurant.description,
          ...restaurant.categories.map(c => c.title),
          ...restaurant.location.display_address
        ].join(' ').toLowerCase();
        return terms.every(term => searchText.includes(term));
      });
    }

    // Filter by price
    if (searchParams.priceFilter) {
      filtered = filtered.filter(r => r.price === searchParams.priceFilter);
    }

    // Filter by rating
    if (searchParams.ratingFilter > 0) {
      filtered = filtered.filter(r => r.rating >= searchParams.ratingFilter);
    }

    setRestaurants(filtered);
  }, [searchParams, allRestaurants]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="mb-4">
            <i className="fas fa-search me-2"></i>
            Search Restaurants
          </h1>
        </Col>
      </Row>

      {/* Search and Filter Controls */}
      <Row className="mb-4">
        <Col lg={12}>
          <Form className="bg-light p-4 rounded">
            <Row>
              <Col md={6} lg={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Search Restaurants</Form.Label>
                  <Form.Control
                    type="text"
                    name="term"
                    value={searchParams.term}
                    onChange={handleChange}
                    placeholder="Search by name, category, or description..."
                  />
                </Form.Group>
              </Col>
              <Col md={3} lg={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Price Range</Form.Label>
                  <Form.Select
                    name="priceFilter"
                    value={searchParams.priceFilter}
                    onChange={handleChange}
                  >
                    <option value="">All Prices</option>
                    <option value="$">$ (Budget)</option>
                    <option value="$$">$$ (Moderate)</option>
                    <option value="$$$">$$$ (Luxury)</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3} lg={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Minimum Rating</Form.Label>
                  <Form.Select
                    name="ratingFilter"
                    value={searchParams.ratingFilter}
                    onChange={handleChange}
                  >
                    <option value="0">All Ratings</option>
                    <option value="4.5">4.5+ ⭐</option>
                    <option value="4">4+ ⭐</option>
                    <option value="3.5">3.5+ ⭐</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      {/* Active Filters */}
      {(searchParams.term || searchParams.priceFilter || searchParams.ratingFilter > 0) && (
        <Row className="mb-3">
          <Col>
            <div className="d-flex gap-2 align-items-center">
              <small className="text-muted">Active Filters:</small>
              {searchParams.term && (
                <Badge bg="primary">{searchParams.term}</Badge>
              )}
              {searchParams.priceFilter && (
                <Badge bg="success">{searchParams.priceFilter}</Badge>
              )}
              {searchParams.ratingFilter > 0 && (
                <Badge bg="warning">Rating {searchParams.ratingFilter}+</Badge>
              )}
            </div>
          </Col>
        </Row>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {/* Loading Spinner */}
      {loading && <LoadingSpinner message="Searching for restaurants..." />}

      {/* Results */}
      {!loading && restaurants.length > 0 && (searchParams.term || searchParams.priceFilter || searchParams.ratingFilter > 0) && (
        <Row>
          <Col>
            <h3 className="mb-4">
              <i className="fas fa-utensils me-2"></i>
              Search Results
            </h3>
            <p className="text-muted mb-4">
              Found {restaurants.length} restaurant{restaurants.length !== 1 ? 's' : ''}
            </p>
            <Row>
              {restaurants.map(restaurant => (
                <Col key={restaurant.id} lg={4} md={6} className="mb-4">
                  <RestaurantCard restaurant={restaurant} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}

      {/* All Restaurants */}
      {!loading && restaurants.length > 0 && !searchParams.term && !searchParams.priceFilter && searchParams.ratingFilter === 0 && (
        <Row>
          <Col>
            <h3 className="mb-4">
              <i className="fas fa-clipboard-list me-2"></i>
              All Restaurants
            </h3>
            <Row>
              {restaurants.map(restaurant => (
                <Col key={restaurant.id} lg={4} md={6} className="mb-4">
                  <RestaurantCard restaurant={restaurant} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}

      {/* No Results */}
      {!loading && restaurants.length === 0 && searchParams.term && (
        <Row>
          <Col className="text-center py-5">
            <i className="fas fa-search fa-3x text-muted mb-3"></i>
            <h4>No restaurants found</h4>
            <p className="text-muted">
              Try adjusting your search terms
            </p>
          </Col>
        </Row>
      )}

      {/* Featured Section */}
      {!loading && !searchParams.term && !searchParams.priceFilter && searchParams.ratingFilter === 0 && (
        <Row className="mb-5">
          <Col>
            <h3 className="mb-4">
              <i className="fas fa-star text-warning me-2"></i>
              Featured Restaurants
            </h3>
            <Row>
              {restaurants
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 3)
                .map(restaurant => (
                  <Col key={restaurant.id} md={4} className="mb-4">
                    <RestaurantCard restaurant={restaurant} featured={true} />
                  </Col>
                ))
              }
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default RestaurantSearch;