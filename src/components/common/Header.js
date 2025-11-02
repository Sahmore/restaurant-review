/* AUTO-FIX CHECKED: potential delimiter imbalance. Please review. */
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <i className="fas fa-utensils me-2"></i>
            Restaurant Reviews
          </Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/search">
              <Nav.Link>Search Restaurants</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/my-reviews">
              <Nav.Link>My Reviews</Nav.Link>
            </LinkContainer>
          </Nav>
          
          <Nav>
            <Nav.Link>
              <i className="fas fa-user me-1"></i>
              Tekgedi Makhoana
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;