/* AUTO-FIX CHECKED: potential delimiter imbalance. Please review. */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Tabs, Tab, Alert } from 'react-bootstrap';
import ReviewCard from '../components/reviews/ReviewCard';
import ReviewForm from '../components/reviews/ReviewForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { restaurantsAPI, reviewsAPI } from '../services/api';
import { authService } from '../services/auth';
import { generateStarRating, formatDate } from '../utils/helpers';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('reviews');
  const [editingReview, setEditingReview] = useState(null);
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    fetchRestaurantData();
  }, [id]);

  const fetchRestaurantData = async () => {
    try {
      setLoading(true);
      const [restaurantResponse, reviewsResponse] = await Promise.all([
        restaurantsAPI.getById(id),
        restaurantsAPI.getReviews(id)
      ]);
      
      setRestaurant(restaurantResponse.data.data);
      setReviews(reviewsResponse.data.data.reviews || []);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch restaurant details');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (reviewData) => {
    try {
      const completeReviewData = {
        ...reviewData,
        restaurantId: id,
        userId: currentUser.id,
        userName: currentUser.name
      };

      if (editingReview) {
        // Keep the review ID out of the update data
        const { id, ...reviewDataToUpdate } = completeReviewData;
        await reviewsAPI.update(editingReview.id, reviewDataToUpdate);
      } else {
        await reviewsAPI.create(completeReviewData);
      }
      setEditingReview(null);
      await fetchRestaurantData(); // Refresh reviews
      setActiveTab('reviews');
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to submit review');
    }
  };

  const handleReviewEdit = async (review) => {
    setActiveTab('add-review');
    // The ReviewForm will be updated with the review data
    setEditingReview(review);
  };

  const handleReviewDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewsAPI.delete(reviewId, currentUser.id);
        await fetchRestaurantData(); // Refresh reviews
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete review');
      }
    }
  };

  if (loading) return <LoadingSpinner message="Loading restaurant details..." />;
  if (error) return <Alert variant="danger" className="m-3">{error}</Alert>;
  if (!restaurant) return <Alert variant="warning" className="m-3">Restaurant not found</Alert>;

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length || 0;

  return (
    <Container>
      {/* Restaurant Header */}
      <Row className="mb-4">
        <Col md={4}>
          <img
            src={restaurant.image_url || 'https://via.placeholder.com/400x300/cccccc/969696?text=Restaurant'}
            alt={restaurant.name}
            className="img-fluid rounded shadow"
            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
          />
        </Col>
        <Col md={8}>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h1>{restaurant.name}</h1>
              <div className="mb-2">
                {generateStarRating(restaurant.rating)}
                <span className="ms-2 text-muted">
                  {restaurant.rating} ({restaurant.review_count} Yelp reviews)
                </span>
              </div>
            </div>
            {restaurant.price && (
              <Badge bg="success" className="fs-6">{restaurant.price}</Badge>
            )}
          </div>

          <div className="mb-3">
            {restaurant.categories?.map(category => (
              <Badge key={category.alias} bg="secondary" className="me-1">
                {category.title}
              </Badge>
            ))}
          </div>

          <div className="mb-3">
            <p className="mb-1">
              <i className="fas fa-map-marker-alt me-2 text-muted"></i>
              {restaurant.location?.display_address?.join(', ')}
            </p>
            {restaurant.phone && (
              <p className="mb-1">
                <i className="fas fa-phone me-2 text-muted"></i>
                {restaurant.display_phone}
              </p>
            )}
          </div>

          {restaurant.hours?.[0] && (
            <div className="mb-3">
              <strong>Hours: </strong>
              {restaurant.hours[0].is_open_now ? (
                <Badge bg="success">Open Now</Badge>
              ) : (
                <Badge bg="danger">Closed</Badge>
              )}
            </div>
          )}

          {/* Our Platform Stats */}
          <Card className="bg-light">
            <Card.Body>
              <Row>
                <Col>
                  <h6 className="mb-0">{reviews.length}</h6>
                  <small className="text-muted">Our Reviews</small>
                </Col>
                <Col>
                  <h6 className="mb-0">{averageRating.toFixed(1)}</h6>
                  <small className="text-muted">Avg Rating</small>
                </Col>
                <Col>
                  <h6 className="mb-0">{restaurant.review_count}</h6>
                  <small className="text-muted">Yelp Reviews</small>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tabs */}
      <Tabs activeKey={activeTab} onSelect={setActiveTab} className="mb-4">
        <Tab eventKey="reviews" title={`Reviews (${reviews.length})`}>
          <Row>
            <Col lg={8}>
              {reviews.length > 0 ? (
                reviews.map(review => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    onDelete={handleReviewDelete}
                    onEdit={handleReviewEdit}
                    showActions={true}
                    currentUserId={currentUser.id}
                  />
                ))
              ) : (
                <Card>
                  <Card.Body className="text-center py-5">
                    <i className="fas fa-comments fa-3x text-muted mb-3"></i>
                    <h5>No Reviews Yet</h5>
                    <p className="text-muted">Be the first to review this restaurant!</p>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="add-review" title={editingReview ? "Edit Review" : "Write Review"}>
          <Row>
            <Col lg={6}>
              <ReviewForm
                onSubmit={handleReviewSubmit}
                initialData={editingReview}
                buttonText={editingReview ? "Update Review" : "Submit Review"}
                onCancel={() => {
                  setEditingReview(null);
                  setActiveTab('reviews');
                }}
                restaurant={restaurant}
              />
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="photos" title="Photos">
          <Row>
            {restaurant.photos?.slice(0, 6).map((photo, index) => (
              <Col key={index} md={4} className="mb-3">
                <img
                  src={photo}
                  alt={`${restaurant.name} ${index + 1}`}
                  className="img-fluid rounded shadow-sm"
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              </Col>
            ))}
            {(!restaurant.photos || restaurant.photos.length === 0) && (
              <Col className="text-center py-5">
                <i className="fas fa-camera fa-3x text-muted mb-3"></i>
                <h5>No Photos Available</h5>
              </Col>
            )}
          </Row>
        </Tab>
      </Tabs>

      {/* Back to Search */}
      <div className="text-center mt-4">
        <Link to="/search">
          <Button variant="outline-primary">
            <i className="fas fa-arrow-left me-2"></i>
            Back to Search
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default RestaurantDetail;