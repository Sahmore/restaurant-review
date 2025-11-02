/* AUTO-FIX CHECKED: potential delimiter imbalance. Please review. */
import React, { useState } from 'react';
import { Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';

const ReviewForm = ({ onSubmit, initialData = {}, buttonText = "Submit Review", restaurant, onCancel }) => {
  const [formData, setFormData] = useState({
    ...initialData,
    title: initialData?.title || '',
    content: initialData?.content || '',
    rating: initialData?.rating || 5,
    foodQuality: initialData?.foodQuality || 5,
    service: initialData?.service || 5,
    ambiance: initialData?.ambiance || 5,
    value: initialData?.value || 5
  });
  
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('rating') || name.includes('Quality') || name.includes('service') || name.includes('ambiance') || name.includes('value') ? parseInt(value) : value
    }));
  };

  const handleStarClick = (category, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    try {
      await onSubmit(formData);
    } catch (error) {
      setErrors([error.message || 'Failed to submit review']);
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ category, value, label, onRate }) => {
    return (
      <div className="mb-3">
        <Form.Label className="fw-bold">{label}</Form.Label>
        <div className="d-flex align-items-center">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type="button"
              className="btn btn-link p-1 border-0"
              onClick={() => onRate(category, star)}
              onMouseEnter={(e) => {
                const stars = e.target.parentElement.querySelectorAll('i');
                stars.forEach((s, index) => {
                  if (index < star) {
                    s.className = 'fas fa-star text-warning';
                  }
                });
              }}
              onMouseLeave={(e) => {
                const stars = e.target.parentElement.querySelectorAll('i');
                stars.forEach((s, index) => {
                  s.className = `fas fa-star ${index < value ? 'text-warning' : 'text-secondary'}`;
                });
              }}
            >
              <i 
                className={`fas fa-star ${star <= value ? 'text-warning' : 'text-secondary'}`}
                style={{ fontSize: '1.5rem', cursor: 'pointer' }}
              />
            </button>
          ))}
          <span className="ms-2 text-muted fw-bold">{value}/5</span>
        </div>
      </div>
    );
  };

  const overallRating = (
    (formData.rating + formData.foodQuality + formData.service + formData.ambiance + formData.value) / 5
  ).toFixed(1);

  return (
    <Card>
      <Card.Body>
        {restaurant && (
          <div className="mb-4 p-3 bg-light rounded">
            <h6 className="mb-2 fw-bold">Reviewing: {restaurant.name}</h6>
            <small className="text-muted">
              {restaurant.location?.display_address?.join(', ')}
            </small>
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          {errors.length > 0 && (
            <Alert variant="danger">
              {errors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </Alert>
          )}

          {/* Overall Rating */}
          <div className="mb-4 p-3 border rounded bg-light">
            <h6 className="fw-bold">Overall Rating</h6>
            <StarRating 
              category="rating"
              value={formData.rating}
              label=""
              onRate={handleStarClick}
            />
            <div className="text-center">
              <strong className="h4 text-primary">{overallRating}</strong>
              <small className="text-muted d-block">Overall Score</small>
            </div>
          </div>

          {/* Detailed Ratings */}
          <div className="mb-4">
            <h6 className="fw-bold">Detailed Ratings</h6>
            <StarRating 
              category="foodQuality"
              value={formData.foodQuality}
              label="Food Quality"
              onRate={handleStarClick}
            />
            <StarRating 
              category="service"
              value={formData.service}
              label="Service"
              onRate={handleStarClick}
            />
            <StarRating 
              category="ambiance"
              value={formData.ambiance}
              label="Ambiance"
              onRate={handleStarClick}
            />
            <StarRating 
              category="value"
              value={formData.value}
              label="Value for Money"
              onRate={handleStarClick}
            />
          </div>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Review Title *</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              maxLength={100}
              placeholder="Give your review a title"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Review Content *</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              maxLength={1000}
              placeholder="Share your detailed experience at this restaurant..."
            />
            <Form.Text className="text-muted">
              {formData.content.length}/1000 characters
            </Form.Text>
          </Form.Group>

          <div className="d-flex gap-2">
            {onCancel && (
              <Button 
                variant="outline-secondary" 
                onClick={onCancel}
                className="flex-fill"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            )}
            <Button 
              variant="primary" 
              type="submit" 
              disabled={isSubmitting}
              className="flex-fill"
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  {buttonText.includes('Update') ? 'Updating...' : 'Submitting...'}
                </>
              ) : (
                buttonText
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ReviewForm;