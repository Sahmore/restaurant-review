/* AUTO-FIX CHECKED: potential delimiter imbalance. Please review. */
import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { generateStarRating } from '../../utils/helpers';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img 
        variant="top" 
        src={restaurant.image_url || '/default-restaurant.jpg'} 
        style={{ height: '200px', objectFit: 'cover' }}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x200/cccccc/969696?text=Restaurant';
        }}
      />
      
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h5">{restaurant.name}</Card.Title>
        
        <div className="mb-2">
          {generateStarRating(restaurant.rating)}
          <small className="text-muted ms-2">({restaurant.review_count} reviews)</small>
        </div>
        
        <div className="mb-2">
          {restaurant.categories?.map(category => (
            <Badge key={category.alias} bg="secondary" className="me-1 mb-1">
              {category.title}
            </Badge>
          ))}
        </div>
        
        <div className="mb-2">
          <small className="text-muted">
            <i className="fas fa-map-marker-alt me-1"></i>
            {restaurant.location?.display_address?.join(', ')}
          </small>
        </div>
        
        {restaurant.price && (
          <div className="mb-3">
            <small className="text-success fw-bold">{restaurant.price}</small>
          </div>
        )}
        
        <div className="mt-auto">
          <Link to={`/restaurant/${restaurant.id}`}>
            <Button variant="primary" size="sm" className="w-100">
              View Details & Reviews
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RestaurantCard;