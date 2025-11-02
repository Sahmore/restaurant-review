/* AUTO-FIX CHECKED: potential delimiter imbalance. Please review. */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RestaurantCard from '../components/restaurants/RestaurantCard';
import SearchBar from '../components/common/SearchBar';

// Local data - this will always work
const featuredRestaurants = [
  {
    id: "lesotho-1",
    name: "Semonkong Lodge Restaurant",
    image_url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/c0/db/3c/semonkong-lodge.jpg?w=700&h=-1&s=1",
    rating: 4.5,
    review_count: 47,
    price: "$$",
    categories: [{ title: "African" }, { title: "Lodges" }],
    location: {
      display_address: ["Semonkong Village", "Semonkong, Lesotho"]
    }
  },
  {
    id: "lesotho-2", 
    name: "Mokhotlong Mountain Cafe",
    image_url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/c0/db/52/semonkong-lodge.jpg?w=1400&h=800&s=1",
    rating: 4.2,
    review_count: 32,
    price: "$",
    categories: [{ title: "Cafe" }, { title: "Bakery" }],
    location: {
      display_address: ["Main Street", "Mokhotlong, Lesotho"]
    }
  },
  {
    id: "lesotho-3",
    name: "Thaba-Bosiu Cultural Restaurant",
    image_url: "https://media-cdn.tripadvisor.com/media/photo-s/0f/0d/b0/1c/restaurant-and-bar-area.jpg",
    rating: 4.7,
    review_count: 89,
    price: "$$",
    categories: [{ title: "Traditional" }, { title: "Cultural Experience" }],
    location: {
      display_address: ["Thaba-Bosiu Cultural Village", "Thaba-Bosiu, Lesotho"]
    }
  },
  {
    id: "lesotho-4",
    name: "Maletsunyane Falls Bistro", 
    image_url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/c0/db/52/semonkong-lodge.jpg?w=1400&h=800&s=1",
    rating: 4.4,
    review_count: 56,
    price: "$$$",
    categories: [{ title: "Bistro" }, { title: "International" }],
    location: {
      display_address: ["Near Maletsunyane Falls", "Semonkong, Lesotho"]
    }
  },
  {
    id: "lesotho-5",
    name: "Maseru Street Food Market",
    image_url: "https://media-cdn.tripadvisor.com/media/photo-s/0f/0d/b0/1c/restaurant-and-bar-area.jpg",
    rating: 4.3, 
    review_count: 124,
    price: "$",
    categories: [{ title: "Street Food" }, { title: "Market" }],
    location: {
      display_address: ["Kingsway Street", "Maseru, Lesotho"]
    }
  },
  {
    id: "lesotho-6",
    name: "Katse Dam View Restaurant",
    image_url: "https://www.motebong.com/assets/user/page-gallery/bar-dining-2.jpg",
    rating: 4.6,
    review_count: 41,
    price: "$$$", 
    categories: [{ title: "Seafood" }, { title: "Fine Dining" }],
    location: {
      display_address: ["Katse Dam Complex", "Katse, Lesotho"]
    }
  }
];

const Home = () => {
  const handleSearch = (searchParams) => {
    console.log('Search:', searchParams);
  };

  return (
    <Container fluid className="px-0">
      {/* Hero Section with Food Image */}
      <div 
        className="hero-section text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/c0/db/52/semonkong-lodge.jpg?w=1400&h=800&s=1')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Container>
          <Row className="text-center">
            <Col>
              <h1 className="display-3 fw-bold mb-4 text-shadow">
                <i className="fas fa-utensils me-3"></i>
                Taste Lesotho
              </h1>
              <p className="lead mb-5 fs-4 text-shadow">
                Discover authentic Basotho cuisine and share your dining experiences in the Mountain Kingdom
              </p>
              
              {/* Search Bar Overlay */}
              <div className="bg-white rounded p-4 shadow-lg mx-auto" style={{maxWidth: '800px'}}>
                <SearchBar size="lg" onSearch={handleSearch} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Featured Lesotho Restaurants */}
      <Container className="py-5">
        <Row className="mb-5">
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="display-5">
                <i className="fas fa-crown text-warning me-2"></i>
                Featured Lesotho Restaurants
              </h2>
              <Link to="/search">
                <Button variant="outline-primary" size="lg">
                  View All Restaurants
                </Button>
              </Link>
            </div>

            <Row>
              {featuredRestaurants.map(restaurant => (
                <Col key={restaurant.id} lg={4} md={6} className="mb-4">
                  <RestaurantCard restaurant={restaurant} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Features Section */}
        <Row className="mb-5">
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body className="p-4">
                <i className="fas fa-mountain fa-3x text-primary mb-3"></i>
                <Card.Title className="h4">Mountain Cuisine</Card.Title>
                <Card.Text className="fs-6">
                  Experience traditional Basotho dishes made with fresh, local ingredients from the Maloti Mountains.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body className="p-4">
                <i className="fas fa-star fa-3x text-primary mb-3"></i>
                <Card.Title className="h4">Honest Reviews</Card.Title>
                <Card.Text className="fs-6">
                  Read authentic reviews from fellow food lovers and share your own dining experiences.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body className="p-4">
                <i className="fas fa-edit fa-3x text-primary mb-3"></i>
                <Card.Title className="h4">Detailed Ratings</Card.Title>
                <Card.Text className="fs-6">
                  Rate food quality, service, ambiance, and value to help others make informed decisions.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Quick Stats */}
        <Row className="text-center py-5 bg-dark text-light rounded mb-5">
          <Col md={3} className="mb-3">
            <h3 className="text-warning display-6">6</h3>
            <p className="fs-5">Featured Restaurants</p>
          </Col>
          <Col md={3} className="mb-3">
            <h3 className="text-warning display-6">100+</h3>
            <p className="fs-5">Local Dishes</p>
          </Col>
          <Col md={3} className="mb-3">
            <h3 className="text-warning display-6">4.5</h3>
            <p className="fs-5">Average Rating</p>
          </Col>
          <Col md={3} className="mb-3">
            <h3 className="text-warning display-6">10+</h3>
            <p className="fs-5">Mountain Regions</p>
          </Col>
        </Row>

        {/* Cultural Experience Section */}
        <Row className="text-center py-5 bg-light rounded">
          <Col>
            <h3 className="display-5 text-primary mb-4">Experience Basotho Culture</h3>
            <Row>
              <Col md={3} className="mb-4">
                <div className="cultural-item">
                  <i className="fas fa-drum fa-3x text-warning mb-3"></i>
                  <h5 className="fw-bold">Traditional Music</h5>
                  <p className="text-muted">Enjoy authentic Basotho musical performances</p>
                </div>
              </Col>
              <Col md={3} className="mb-4">
                <div className="cultural-item">
                  <i className="fas fa-utensils fa-3x text-warning mb-3"></i>
                  <h5 className="fw-bold">Local Cuisine</h5>
                  <p className="text-muted">Taste traditional dishes like papa and moroho</p>
                </div>
              </Col>
              <Col md={3} className="mb-4">
                <div className="cultural-item">
                  <i className="fas fa-mountain fa-3x text-warning mb-3"></i>
                  <h5 className="fw-bold">Mountain Views</h5>
                  <p className="text-muted">Dine with breathtaking Maloti mountain scenery</p>
                </div>
              </Col>
              <Col md={3} className="mb-4">
                <div className="cultural-item">
                  <i className="fas fa-hands-helping fa-3x text-warning mb-3"></i>
                  <h5 className="fw-bold">Warm Hospitality</h5>
                  <p className="text-muted">Experience the famous Basotho welcome</p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Home;