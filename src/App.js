import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import RestaurantSearch from './pages/RestaurantSearch';
import RestaurantDetail from './pages/RestaurantDetail';
import MyReviews from './pages/MyReviews';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Container className="py-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<RestaurantSearch />} />
              <Route path="/restaurant/:id" element={<RestaurantDetail />} />
              <Route path="/my-reviews" element={<MyReviews />} />
              <Route path="*" element={
                <div className="text-center py-5">
                  <h1>404 - Page Not Found</h1>
                  <p>The page you're looking for doesn't exist.</p>
                </div>
              } />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;