import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiService = {
  async getBookingStatus(bookId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/book/${bookId}/check`);
      return response.data?.data || null;
    } catch (error) {
      console.error('Error fetching booking status:', error);
      return null;
    }
  },

  async getBookingDetails(bookId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/book/${bookId}/details`);
      return response.data?.data || null;
    } catch (error) {
      console.error('Error fetching booking details:', error);
      return null;
    }
  },

  async registerUser(userData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/register`, userData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      throw error.response?.data || { message: "An error occurred. Please try again." };
    }
  },

  async loginUser(credentials) {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/login`, credentials, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error.response?.data || { message: "An error occurred. Please try again." };
    }
  }
};

export default apiService;
