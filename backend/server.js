/* AUTO-FIX CHECKED: potential delimiter imbalance. Please review. */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Lesotho restaurants data
const lesothoRestaurants = [
  {
    id: "lesotho-1",
    name: "Semonkong Lodge Restaurant",
    image_url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600",
    rating: 4.5,
    review_count: 47,
    price: "$$",
    categories: [{ title: "African" }, { title: "Lodges" }],
    location: {
      display_address: ["Semonkong Village", "Semonkong, Lesotho"]
    },
    description: "Traditional Basotho cuisine with stunning mountain views."
  },
  {
    id: "lesotho-2", 
    name: "Mokhotlong Mountain Cafe",
    image_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600",
    rating: 4.2,
    review_count: 32,
    price: "$",
    categories: [{ title: "Cafe" }, { title: "Bakery" }],
    location: {
      display_address: ["Main Street", "Mokhotlong, Lesotho"]
    },
    description: "Cozy mountain cafe serving fresh coffee and local pastries."
  },
  {
    id: "lesotho-3",
    name: "Thaba-Bosiu Cultural Restaurant",
    image_url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600", 
    rating: 4.7,
    review_count: 89,
    price: "$$",
    categories: [{ title: "Traditional" }, { title: "Cultural Experience" }],
    location: {
      display_address: ["Thaba-Bosiu Cultural Village", "Thaba-Bosiu, Lesotho"]
    },
    description: "Authentic Basotho cultural experience with traditional dishes."
  },
  {
    id: "lesotho-4",
    name: "Maletsunyane Falls Bistro", 
    image_url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600",
    rating: 4.4,
    review_count: 56,
    price: "$$$",
    categories: [{ title: "Bistro" }, { title: "International" }],
    location: {
      display_address: ["Near Maletsunyane Falls", "Semonkong, Lesotho"]
    },
    description: "Fine dining with breathtaking views of the Maletsunyane Falls."
  },
  {
    id: "lesotho-5",
    name: "Maseru Street Food Market",
    image_url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600",
    rating: 4.3, 
    review_count: 124,
    price: "$",
    categories: [{ title: "Street Food" }, { title: "Market" }],
    location: {
      display_address: ["Kingsway Street", "Maseru, Lesotho"]
    },
    description: "Vibrant street food market offering local delicacies."
  },
  {
    id: "lesotho-6",
    name: "Katse Dam View Restaurant",
    image_url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
    rating: 4.6,
    review_count: 41,
    price: "$$$", 
    categories: [{ title: "Seafood" }, { title: "Fine Dining" }],
    location: {
      display_address: ["Katse Dam Complex", "Katse, Lesotho"]
    },
    description: "Luxury dining experience overlooking the magnificent Katse Dam."
  }
];

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


// Mount route modules -----------------------------------------------------
// Use the routes defined in backend/routes/*.js to keep routing centralized
const apiIndexRoutes = require('./routes/index');
const restaurantsRoutes = require('./routes/restaurants');
const reviewsRoutes = require('./routes/reviews');
const reviewController = require('./controllers/reviewController');

app.use('/api', apiIndexRoutes);
app.use('/api/restaurants', restaurantsRoutes);
app.use('/api/reviews', reviewsRoutes);

// Support frontend's /api/users/:userId/reviews (mounted at top-level)
// The frontend currently requests /api/users/:userId/reviews, so provide
// a top-level route that maps the param into req.query and delegates
// to the existing controller implementation.
app.get('/api/users/:userId/reviews', (req, res, next) => {
  req.query.userId = req.params.userId;
  return reviewController.getReviews(req, res, next);
});

// Optional debug endpoint
app.get('/api/debug', (req, res) => {
  res.json({
    message: 'Debug route working!',
    routes: [
      '/api/health',
      '/api/restaurants/featured',
      '/api/users/:userId/reviews',
      '/api/restaurants/search',
      '/api/restaurants/:id',
      '/api/restaurants/:id/reviews',
      '/api/reviews'
    ],
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    message: `The route ${req.originalUrl} does not exist on this server`,
    availableRoutes: [
      '/api/health',
      '/api/restaurants/featured',
      '/api/reviews', 
      '/api/users/:userId/reviews',
      '/api/restaurants/search',
      '/api/debug'
    ]
  });
});

// Basic error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: 'Something went wrong on the server'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🍽️  Featured restaurants: http://localhost:${PORT}/api/restaurants/featured`);
  console.log(`🐛 Debug: http://localhost:${PORT}/api/debug`);
  console.log(`🔍 Restaurant search: http://localhost:${PORT}/api/restaurants/search?location=lesotho`);
});