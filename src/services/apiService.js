import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Base API method that handles GET and POST requests with automatic headers
const apiRequest = async (method, endpoint, data = null) => {
  try {
    const token = localStorage.getItem("authToken");
    const locale = localStorage.getItem("locale") || "en";

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Accept-Language": locale,
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios({
      method,
      url: `${API_BASE_URL}${endpoint}`,
      data,
      headers,
    });

    // ✅ If response status is 200, return response data directly
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }

    // If API returns an error response, throw it manually
    throw new Error(response.data?.message || "An unknown error occurred");
  } catch (error) {
    console.error(
      `Error in ${method.toUpperCase()} ${endpoint}:`,
      error.response?.data || error.message
    );

    // ✅ Ensure only actual errors are thrown
    throw (
      error.response?.data || {
        message: "An error occurred. Please try again.",
      }
    );
  }
};

const apiService = {
  getBookingStatus(bookId) {
    return apiRequest("get", `/book/${bookId}/check`);
  },

  getBookingDetails(bookId) {
    return apiRequest("get", `/book/${bookId}/details`);
  },

  registerUser(userData) {
    return apiRequest("post", `/user/register`, userData);
  },


  updateUser(userData) {
    return apiRequest("post", `/user`, userData);
  },

  loginUser(credentials) {
    return apiRequest("post", `/user/login`, credentials);
  },

  fetchAirports(query) {
    return apiRequest(
      "get",
      `/search/airports?query=${encodeURIComponent(query)}`
    );
  },

  // Fetch list of countries (Nationalities)
  fetchCountries() {
    return apiRequest("get", `/nationalities`);
  },

  // Process flight details
  processDetails(payload) {
    return apiRequest("post", `/tfusion/process/flights`, payload);
  },

  // Search flights
  searchFlight(payload) {
    return apiRequest("get", `/tfusion/search/flights?${payload}`);
  },


  //Booking flight
  bookFlight(payload) {
    return apiRequest("post", `/tfusion/book/flights`, payload);
  },

  // My Bookings
  fetchMyFlightBookings() {
    return apiRequest("get", `/bookings`);
  },

  // Get user
  getUser() {
    return apiRequest("get", `/user`);
  },
};

export default apiService;
