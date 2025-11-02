/* AUTO-FIX CHECKED: potential delimiter imbalance. Please review. */
// middleware/validation.js
const validateReviewData = (data) => {
  const errors = [];
  
  if (!data.title || data.title.trim().length === 0) {
    errors.push('Title is required');
  } else if (data.title.trim().length > 100) {
    errors.push('Title must be less than 100 characters');
  }
  
  if (!data.content || data.content.trim().length === 0) {
    errors.push('Content is required');
  } else if (data.content.trim().length > 1000) {
    errors.push('Content must be less than 1000 characters');
  }
  
  if (!data.rating || data.rating < 1 || data.rating > 5) {
    errors.push('Rating must be between 1 and 5');
  }
  
  if (!data.restaurantId || data.restaurantId.trim().length === 0) {
    errors.push('Restaurant ID is required');
  }
  
  if (!data.userId || data.userId.trim().length === 0) {
    errors.push('User ID is required');
  }
  
  if (!data.userName || data.userName.trim().length === 0) {
    errors.push('User name is required');
  } else if (data.userName.trim().length > 50) {
    errors.push('User name must be less than 50 characters');
  }

  const ratingErrors = validateDetailedRatings(data);
  errors.push(...ratingErrors);
  
  return errors;
  
};

const validateReviewUpdate = (data) => {
  const errors = [];
  
  if (data.title !== undefined) {
    if (data.title.trim().length === 0) {
      errors.push('Title cannot be empty');
    } else if (data.title.trim().length > 100) {
      errors.push('Title must be less than 100 characters');
    }
  }
  
  if (data.content !== undefined) {
    if (data.content.trim().length === 0) {
      errors.push('Content cannot be empty');
    } else if (data.content.trim().length > 1000) {
      errors.push('Content must be less than 1000 characters');
    }
  }
  
  if (data.rating !== undefined && (data.rating < 1 || data.rating > 5)) {
    errors.push('Rating must be between 1 and 5');
  }
  
  return errors;
};

const validateSearchParams = (params) => {
  const errors = [];
  
  if (!params.location && !params.term) {
    errors.push('Either location or search term is required');
  }
  
  if (params.location && params.location.trim().length < 2) {
    errors.push('Location must be at least 2 characters long');
  }
  
  if (params.limit && (params.limit < 1 || params.limit > 50)) {
    errors.push('Limit must be between 1 and 50');
  }
  
  return errors;
};

// middleware/validation.js - Add to existing file
const validateDetailedRatings = (data) => {
  const errors = [];
  
  const ratingFields = [
    'foodQuality', 'service', 'ambiance', 'value'
  ];
  
  ratingFields.forEach(field => {
    if (data[field] !== undefined && (data[field] < 1 || data[field] > 5)) {
      errors.push(`${field} must be between 1 and 5`);
    }
  });
  
  return errors;
};


// Update module exports
module.exports = {
  validateReviewData,
  validateReviewUpdate,
  validateSearchParams,
  validateDetailedRatings
};

