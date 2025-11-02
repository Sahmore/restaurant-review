/* AUTO-FIX CHECKED: potential delimiter imbalance. Please review. */
const { admin, db } = require('../config/firebase');
const { validateReviewData, validateReviewUpdate } = require('../middleware/validation');
const { formatReviewResponse, calculateAverageRating } = require('../utils/helpers');

// Get all reviews
const getReviews = async (req, res) => {
  try {
    const { restaurantId, userId } = req.query;
    
    let query = db.collection('reviews');
    
    // Only apply ONE where clause to avoid needing composite indexes
    if (userId) {
      query = query.where('userId', '==', userId);
    } else if (restaurantId) {
      query = query.where('restaurantId', '==', restaurantId);
    }
    
    // Get all matching reviews
    const snapshot = await query.get();
    
    if (snapshot.empty) {
      return res.json({
        success: true,
        data: [],
        count: 0
      });
    }
    
    const reviews = [];
    snapshot.forEach(doc => {
      reviews.push(formatReviewResponse(doc));
    });
    
    // Sort in memory instead of using orderBy to avoid index requirements
    reviews.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return b.createdAt.seconds - a.createdAt.seconds;
    });
    
    res.json({
      success: true,
      data: reviews,
      count: reviews.length
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reviews',
      message: error.message
    });
  }
};

// Get single review
const getReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const reviewDoc = await db.collection('reviews').doc(reviewId).get();
    
    if (!reviewDoc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }
    
    res.json({
      success: true,
      data: formatReviewResponse(reviewDoc)
    });
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch review',
      message: error.message
    });
  }
};

// Create new review
const createReview = async (req, res) => {
  try {
    const { title, content, rating, restaurantId, userId, userName } = req.body;
    
    const validationErrors = validateReviewData({ 
      title, content, rating, restaurantId, userId, userName 
    });
    
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: validationErrors
      });
    }
    
    const reviewData = {
      title: title.trim(),
      content: content.trim(),
      rating: parseInt(rating),
      restaurantId: restaurantId.trim(),
      userId: userId.trim(),
      userName: userName.trim(),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    const docRef = await db.collection('reviews').add(reviewData);
    const createdDoc = await docRef.get();
    
    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: formatReviewResponse(createdDoc)
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create review',
      message: error.message
    });
  }
};

// Update review
const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { title, content, rating, userId } = req.body;
    
    console.log('📝 Updating review:', {
      reviewId,
      userId,
      updateData: { title, content, rating }
    });
    
    if (!reviewId) {
      console.error('❌ No review ID provided');
      return res.status(400).json({
        success: false,
        error: 'Review ID is required'
      });
    }
    
    if (!userId) {
      console.error('❌ No user ID provided');
      return res.status(400).json({
        success: false,
        error: 'User ID is required for update'
      });
    }
    
    // Get the review document
    console.log('🔍 Finding review document...');
    const reviewDoc = await db.collection('reviews').doc(reviewId).get();
    
    if (!reviewDoc.exists) {
      console.error('❌ Review not found:', reviewId);
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }
    
    const existingReview = reviewDoc.data();
    console.log('📄 Existing review:', existingReview);
    
    if (existingReview.userId !== userId) {
      console.error('🚫 Authorization failed - User IDs do not match');
      console.log('Expected:', existingReview.userId, 'Got:', userId);
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this review'
      });
    }
    
    // Validate the update data
    const validationErrors = validateReviewUpdate({ title, content, rating });
    if (validationErrors.length > 0) {
      console.error('❌ Validation errors:', validationErrors);
      return res.status(400).json({
        success: false,
        errors: validationErrors
      });
    }
    
    // Prepare update data
    const updateData = {
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    if (title !== undefined) updateData.title = title.trim();
    if (content !== undefined) updateData.content = content.trim();
    if (rating !== undefined) updateData.rating = parseInt(rating);
    
    // Handle additional rating fields
    const ratingFields = ['foodQuality', 'service', 'ambiance', 'value'];
    ratingFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = parseInt(req.body[field]);
      }
    });
    
    console.log('📝 Applying updates:', updateData);
    
    // Update the document
    await db.collection('reviews').doc(reviewId).update(updateData);
    const updatedDoc = await db.collection('reviews').doc(reviewId).get();
    
    res.json({
      success: true,
      message: 'Review updated successfully',
      data: formatReviewResponse(updatedDoc)
    });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update review',
      message: error.message
    });
  }
};

// Delete review
const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required for deletion'
      });
    }
    
    const reviewDoc = await db.collection('reviews').doc(reviewId).get();
    
    if (!reviewDoc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }
    
    const existingReview = reviewDoc.data();
    
    if (existingReview.userId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this review'
      });
    }
    
    await db.collection('reviews').doc(reviewId).delete();
    
    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete review',
      message: error.message
    });
  }
};

module.exports = {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview
};