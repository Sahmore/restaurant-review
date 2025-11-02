/* AUTO-FIX CHECKED: potential delimiter imbalance. Please review. */
// src/services/auth.js
export const authService = {
  getCurrentUser: () => {
    // Return a user ID that matches what the backend expects
    return {
      id: 'user-123',
      name: 'Demo User',
      email: 'demo@example.com'
    };
  },

  isAuthenticated: () => {
    return true;
  }
};