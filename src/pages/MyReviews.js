/* AUTO-FIX CHECKED: potential delimiter imbalance. Please review. */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReviewCard from '../components/reviews/ReviewCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { reviewsAPI } from '../services/api';
import { authService } from '../services/auth';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    testBackendConnection();
  }, []);

  const testBackendConnection = async () => {
    try {
      console.log('🔍 Testing backend connection...');
      
      // First test if backend is reachable
      const healthResponse = await fetch( (process.env.REACT_APP_API_URL ? (process.env.REACT_APP_API_URL + '/api/health') : 'http://localhost:5000/api/health') );
      if (!healthResponse.ok) {
        throw new Error(`Backend not responding. Status: ${healthResponse.status}`);
      }
      
      const healthData = await healthResponse.json();
      console.log('✅ Backend health:', healthData);
      
      // Now try to fetch reviews
      await fetchMyReviews();
      
    } catch (error) {
      console.error('❌ Backend connection failed:', error);
      setError(`Cannot connect to server: ${error.message}. Please make sure the backend is running on port 5000.`);
      setLoading(false);
    }
  };

  const fetchMyReviews = async () => {
    try {
      console.log(`🔄 Fetching reviews for user: ${currentUser.id}`);
      
      const response = await reviewsAPI.getUserReviews(currentUser.id);
      console.log('✅ Reviews API response:', response);
      
      setReviews(response.data.data || []);
      setError('');
      
    } catch (error) {
      console.error('❌ Error fetching reviews:', error);
      setError(`API Error: ${error.message}. Check browser console for details.`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewsAPI.delete(reviewId, currentUser.id);
        setReviews(prev => prev.filter(review => review.id !== reviewId));
      } catch (error) {
        alert('Failed to delete review: ' + error.message);
      }
    }
  };

  const handleEditReview = (review) => {
    window.location.href = `/restaurant/${review.restaurantId}`;
  };

  if (loading) return <LoadingSpinner message="Testing backend connection..." />;

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>
            <i className="fas fa-star me-2"></i>
            My Reviews
          </h1>
          <p className="text-muted">User ID: {currentUser.id}</p>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" className="mb-4">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
          <div className="mt-2">
            <small>
              Troubleshooting steps:
              <br />1. Make sure backend is running on port 5000
              <br />2. Check if <code>http://localhost:5000/api/health</code> works in your browser
              <br />3. Restart both frontend and backend servers
            </small>
          </div>
        </Alert>
      )}

      {!error && reviews.length === 0 && (
        <Card className="text-center py-5">
          <Card.Body>
            <i className="fas fa-star fa-3x text-muted mb-3"></i>
            <h4>No Reviews Yet</h4>
            <p className="text-muted mb-4">
              You haven't written any reviews yet.
            </p>
            <Link to="/search">
              <Button variant="primary">
                Find Restaurants to Review
              </Button>
            </Link>
          </Card.Body>
        </Card>
      )}

      {reviews.length > 0 && (
        <Row>
          <Col lg={8}>
            {reviews.map(review => (
              <div key={review.id} className="mb-3">
                <ReviewCard
                  review={review}
                  onEdit={handleEditReview}
                  onDelete={handleDeleteReview}
                  showActions={true}
                  currentUserId={currentUser.id}
                />
              </div>
            ))}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default MyReviews;