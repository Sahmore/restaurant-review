/* AUTO-FIX CHECKED: potential delimiter imbalance. Please review. */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ReviewCard from './ReviewCard';

const ReviewList = ({ 
  reviews, 
  onEdit, 
  onDelete, 
  showActions = false, 
  currentUserId 
}) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="fas fa-comments fa-3x text-muted mb-3"></i>
        <h5>No Reviews Yet</h5>
        <p className="text-muted">Be the first to leave a review!</p>
      </div>
    );
  }

  return (
    <Row>
      <Col>
        {reviews.map(review => (
          <div key={review.id} className="mb-3">
            <ReviewCard
              review={review}
              onEdit={onEdit}
              onDelete={onDelete}
              showActions={showActions}
              currentUserId={currentUserId}
            />
          </div>
        ))}
      </Col>
    </Row>
  );
};

export default ReviewList;