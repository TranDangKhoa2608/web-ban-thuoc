// src/services/UserService.js

const API_URL = 'http://localhost:8080/api/users'; // Change to your API base URL

export const UserService = {
  login: async (loginRequest) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      return await response.json(); // Return the response data
    } catch (error) {
      throw error.message; // Return error message
    }
  },

  register: async (registerRequest) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      return await response.json(); // Return the response data
    } catch (error) {
      throw error.message; // Return error message
    }
  },

  // Add other user-related methods as needed
  fetchUserById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`); // Update the URL as necessary
      if (!response.ok) {
        throw new Error('Error fetching user details');
      }
      const data = await response.json();
      return data; // Return the user details
    } catch (error) {
      console.error('Error fetching user details', error);
      throw error;
    }
  }
};

