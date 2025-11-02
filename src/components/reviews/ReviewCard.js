/* AUTO-FIX CHECKED: potential delimiter imbalance. Please review. */
// src/components/reviews/ReviewCard.js
import React from 'react';
import { Card, Badge, Row, Col } from 'react-bootstrap';
import { generateStarRating, formatDate } from '../../utils/helpers';

const ReviewCard = ({ review, onEdit, onDelete, showActions = false, currentUserId }) => {
  const canEdit = showActions && review.userId === currentUserId;

  const RatingBar = ({ label, value }) => (
    <div className="mb-1">
      <small className="text-muted">{label}:</small>
      <div className="d-flex align-items-center">
        {generateStarRating(value)}
        <small className="ms-2">{value}/5</small>
      </div>
    </div>
  );

  return (
    <Card className="mb-3 border-start border-primary border-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="h6 mb-0">{review.title}</Card.Title>
          <Badge bg="primary" className="fs-6">
            {review.rating}/5
          </Badge>
        </div>
        
        {/* Overall Rating */}
        <div className="mb-2">
          <strong>Overall: </strong>
          {generateStarRating(review.rating)}
        </div>

        {/* Detailed Ratings */}
        {(review.foodQuality || review.service || review.ambiance || review.value) && (
          <div className="mb-3 p-3 bg-light rounded">
            <Row>
              <Col md={6}>
                {review.foodQuality && <RatingBar label="Food" value={review.foodQuality} />}
                {review.service && <RatingBar label="Service" value={review.service} />}
              </Col>
              <Col md={6}>
                {review.ambiance && <RatingBar label="Ambiance" value={review.ambiance} />}
                {review.value && <RatingBar label="Value" value={review.value} />}
              </Col>
            </Row>
          </div>
        )}
        
        <Card.Text className="mb-3">{review.content}</Card.Text>
        
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            <i className="fas fa-user me-1"></i>
            {review.userName} • 
            <i className="fas fa-calendar ms-2 me-1"></i>
            {formatDate(review.createdAt)}
          </small>
          
          {canEdit && (
            <div>
              <button 
                className="btn btn-sm btn-outline-primary me-1"
                onClick={() => onEdit(review)}
                title="Edit Review"
              >
                <i className="fas fa-edit"></i>
              </button>
              <button 
                className="btn btn-sm btn-outline-danger"
                onClick={() => onDelete(review.id)}
                title="Delete Review"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;