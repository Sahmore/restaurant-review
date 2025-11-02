// controllers/restaurantController.js
const { db } = require('../config/firebase');
const { formatReviewResponse, calculateAverageRating } = require('../utils/helpers');
const { validateSearchParams } = require('../middleware/validation');
const lesothoRestaurants = require('../data/lesothoRestaurants');

// Search restaurants from local data
const searchRestaurants = async (req, res) => {
  try {
    const { term = '', categories = '', limit = 20 } = req.query;
    
    let filteredRestaurants = [...lesothoRestaurants];
    
    // Filter by search term if provided
    if (term.trim()) {
      const searchTerms = term.toLowerCase().split(/\s+/);
      filteredRestaurants = filteredRestaurants.filter(restaurant => {
        const restaurantText = [
          restaurant.name,
          restaurant.description,
          ...restaurant.categories.map(cat => cat.title),
          ...restaurant.location.display_address,
          restaurant.price
        ].join(' ').toLowerCase();
        
        // Match all search terms
        return searchTerms.every(term => restaurantText.includes(term));
      });
    }
    
    // Filter by categories if provided
    if (categories.trim()) {
      const categoryTerms = categories.toLowerCase().split(',');
      filteredRestaurants = filteredRestaurants.filter(restaurant =>
        restaurant.categories.some(cat =>
          categoryTerms.some(term => cat.title.toLowerCase().includes(term))
        )
      );
    }
    
    // Sort by rating (highest first)
    filteredRestaurants.sort((a, b) => b.rating - a.rating);
    
    // Apply limit
    const limitNum = Math.min(parseInt(limit) || 20, 50); // Cap at 50
    filteredRestaurants = filteredRestaurants.slice(0, limitNum);
    
    res.json({
      success: true,
      data: filteredRestaurants,
      count: filteredRestaurants.length,
      searchParams: { term, categories, limit: limitNum }
    });
    
  } catch (error) {
    console.error('Search Error:', error.response?.data || error.message);
    
    // Fallback to local data if Yelp fails
    if (error.response?.status === 400 || error.response?.status === 401) {
      const filteredRestaurants = lesothoRestaurants.slice(0, 20);
      return res.json({
        success: true,
        data: filteredRestaurants,
        count: filteredRestaurants.length,
        source: 'local_fallback',
        message: 'Using local Lesotho restaurant data'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to search restaurants',
      message: error.message
    });
  }
};

// Get restaurant details
const getRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    
    if (!restaurantId || restaurantId.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Restaurant ID is required'
      });
    }
    
    // Check if it's a Lesotho restaurant
    if (restaurantId.startsWith('lesotho-')) {
      const restaurant = lesothoRestaurants.find(r => r.id === restaurantId);
      if (!restaurant) {
        return res.status(404).json({
          success: false,
          error: 'Restaurant not found'
        });
      }
      return res.json({
        success: true,
        data: restaurant,
        source: 'local'
      });
    }
    
    // Check if Yelp API is configured
    if (!YELP_API_KEY || YELP_API_KEY.includes('your-yelp-api-key')) {
      return res.status(503).json({
        success: false,
        error: 'Service temporarily unavailable',
        message: 'Yelp API is not configured'
      });
    }
    
    const response = await axios.get(`${YELP_BASE_URL}/businesses/${restaurantId}`, {
      headers: yelpHeaders,
      timeout: 10000
    });
    
    const restaurant = sanitizeRestaurantData(response.data);
    
    res.json({
      success: true,
      data: restaurant,
      source: 'yelp'
    });
    
  } catch (error) {
    console.error('Restaurant Details Error:', error.response?.data || error.message);
    
    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        error: 'Restaurant not found',
        message: 'The requested restaurant was not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch restaurant details',
      message: error.message
    });
  }
};

// Get restaurant reviews from our platform
const getRestaurantReviews = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    
    if (!restaurantId || restaurantId.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Restaurant ID is required'
      });
    }
    
    // Only filter by restaurantId, no sorting in the query
    const snapshot = await db.collection('reviews')
      .where('restaurantId', '==', restaurantId)
      .get();
    
    const reviews = [];
    snapshot.forEach(doc => {
      reviews.push(formatReviewResponse(doc));
    });
    
    // Sort reviews in memory by createdAt
    reviews.sort((a, b) => {
      const dateA = a.createdAt?.seconds || 0;
      const dateB = b.createdAt?.seconds || 0;
      return dateB - dateA; // descending order (newest first)
    });
    
    const averageRating = calculateAverageRating(reviews);
    
    // Calculate rating distribution
    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach(review => {
      ratingDistribution[review.rating]++;
    });
    
    res.json({
      success: true,
      data: {
        restaurantId,
        reviews,
        averageRating,
        totalReviews: reviews.length,
        ratingDistribution
      }
    });
  } catch (error) {
    console.error('Error fetching restaurant reviews:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch restaurant reviews',
      message: error.message
    });
  }
};

// Get featured Lesotho restaurants
// Get featured Lesotho restaurants
const getFeaturedRestaurants = async (req, res) => {
  try {
    console.log('📢 Featured restaurants endpoint called!');
    
    // Get featured restaurants from our Lesotho data
    const featured = lesothoRestaurants
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
    
    console.log(`✅ Sending ${featured.length} featured restaurants`);
    
    res.json({
      success: true,
      data: featured,
      count: featured.length,
      message: 'Featured Lesotho restaurants loaded successfully'
    });
  } catch (error) {
    console.error('❌ Error in getFeaturedRestaurants:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch featured restaurants',
      message: error.message
    });
  }
};

// Get featured Lesotho restaurants


module.exports = {
  searchRestaurants,
  getRestaurant,
  getRestaurantReviews,
  getFeaturedRestaurants
};