/* AUTO-FIX CHECKED: potential delimiter imbalance. Please review. */
// utils/helpers.js
const formatFirestoreTimestamp = (data) => {
  if (!data) return data;
  
  const formatted = { ...data };
  
  if (formatted.createdAt && typeof formatted.createdAt.toDate === 'function') {
    formatted.createdAt = formatted.createdAt.toDate().toISOString();
  }
  
  if (formatted.updatedAt && typeof formatted.updatedAt.toDate === 'function') {
    formatted.updatedAt = formatted.updatedAt.toDate().toISOString();
  }
  
  return formatted;
};

const formatReviewResponse = (doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    ...formatFirestoreTimestamp(data)
  };
};

const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((total / reviews.length) * 10) / 10;
};

const sanitizeRestaurantData = (business) => ({
  id: business.id,
  name: business.name,
  image_url: business.image_url,
  url: business.url,
  review_count: business.review_count,
  categories: business.categories?.map(cat => ({
    alias: cat.alias,
    title: cat.title
  })) || [],
  rating: business.rating,
  price: business.price,
  location: {
    address1: business.location?.address1,
    address2: business.location?.address2,
    address3: business.location?.address3,
    city: business.location?.city,
    state: business.location?.state,
    zip_code: business.location?.zip_code,
    country: business.location?.country,
    display_address: business.location?.display_address
  },
  coordinates: business.coordinates,
  phone: business.phone,
  display_phone: business.display_phone,
  distance: business.distance,
  photos: business.photos || [],
  hours: business.hours || [],
  transactions: business.transactions || [],
  is_closed: business.is_closed
});

module.exports = {
  formatFirestoreTimestamp,
  formatReviewResponse,
  calculateAverageRating,
  sanitizeRestaurantData
};