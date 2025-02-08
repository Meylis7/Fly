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
};

export default apiService;
