const BASE_URL = 'http://localhost:8080/api/carts'; // The base URL of your API

// Service for managing the cart
export const CartService = {
  // Get all cart items for a specific user
  getCartByUserID: async (userID) => {
    try {
      const response = await fetch(`${BASE_URL}/user/${userID}`);
      if (!response.ok) {
        throw new Error('Error fetching cart items');
      }
      const data = await response.json();
      return data; // Return the cart items
    } catch (error) {
      console.error('Error fetching cart items', error);
      throw error;
    }
  },

  // Add a product to the cart
  addProductToCart: async (userID, productID, price, quantity) => {
    try {
      // Create FormData object
      const formData = new FormData();
      formData.append('userID', userID);
      formData.append('medicineID', productID); // Use 'medicineID' instead of 'productID'
      formData.append('price', price);
      formData.append('quantity', quantity);

      const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        body: formData, // Send FormData
      });

      if (!response.ok) {
        throw new Error('Error adding product to cart');
      }

      const data = await response.json(); // Assume API returns JSON
      return data; // Return the response data from API
    } catch (error) {
      console.error('Error adding product to cart', error);
      throw error;
    }
  },

  // Update a cart item
  updateCart: async (cartID, updatedCart) => {
    try {
      const response = await fetch(`${BASE_URL}/${cartID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCart),
      });
      if (!response.ok) {
        throw new Error('Error updating cart item');
      }
      const data = await response.json();
      return data; // Return the updated cart item
    } catch (error) {
      console.error('Error updating cart item', error);
      throw error;
    }
  },

  // Delete a cart item
  deleteCartItem: async (cartID) => {
    try {
      const response = await fetch(`${BASE_URL}/${cartID}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error deleting cart item');
      }
    } catch (error) {
      console.error('Error deleting cart item', error);
      throw error;
    }
  },

  // Get the total number of items in the cart for a specific user
  getCartCount: async (userID) => {
    if (!userID) {
      throw new Error('User ID is required to fetch cart count'); // Check if userID is valid
    }

    try {
      const response = await fetch(`${BASE_URL}/user/${userID}`);
      if (!response.ok) {
        throw new Error(`Error fetching cart count: ${response.statusText}`); // Detailed error
      }

      const data = await response.json();
      return data.totalCount || 0; // Return the item count, assuming API returns totalCount property
    } catch (error) {
      console.error('Error fetching cart count:', error);
      throw error; // Rethrow error to handle elsewhere if needed
    }
  },

  // Update the quantity of a cart item
  updateCartQuantity: async (cartID, quantity) => {
    try {
      const response = await fetch(`${BASE_URL}/${cartID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });
      if (!response.ok) {
        throw new Error('Error updating cart quantity');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating cart quantity', error);
      throw error;
    }
  },
};
