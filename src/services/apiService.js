import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper function to get user's IP address with multiple fallback services
const getUserIP = async () => {
  const ipServices = [
    {
      url: 'https://api.ipify.org?format=json',
      getIP: (data) => data.ip
    },
    {
      url: 'https://api64.ipify.org?format=json', 
      getIP: (data) => data.ip
    },
    {
      url: 'https://httpbin.org/ip',
      getIP: (data) => data.origin
    },
    {
      url: 'https://api.myip.com',
      getIP: (data) => data.ip
    },
    {
      url: 'https://ipapi.co/json/',
      getIP: (data) => data.ip
    }
  ];

  for (const service of ipServices) {
    try {
      console.log(`Trying to get IP from: ${service.url}`);
      const response = await axios.get(service.url, { 
        timeout: 5000 // 5 second timeout per service
      });
      const ip = service.getIP(response.data);
      
      // Validate IP format (basic IPv4/IPv6 validation)
      if (ip && ip !== '0.0.0.0' && /^(?:(?:\d{1,3}\.){3}\d{1,3}|(?:[0-9a-fA-F]*:+)+[0-9a-fA-F]*)$/.test(ip)) {
        console.log(`Successfully got IP: ${ip} from ${service.url}`);
        return ip;
      } else {
        console.warn(`Invalid IP received from ${service.url}: ${ip}`);
      }
    } catch (error) {
      console.warn(`Failed to get IP from ${service.url}:`, error.message);
      continue; // Try next service
    }
  }

  // If all services fail, throw an error instead of returning invalid IP
  throw new Error('Unable to determine user IP address. All IP detection services failed.');
};

// Helper function to get meta data
const getMetaData = async () => {
  let userIP;
  
  try {
    userIP = await getUserIP();
  } catch (error) {
    console.error('Failed to get user IP:', error.message);
    // Instead of using 0.0.0.0, we'll let the API handle this case
    // by not including the IP or using a special indicator
    throw new Error('Unable to determine IP address. Please check your internet connection and try again.');
  }

  return {
    end_user_ip_address: userIP,
    end_user_browser_agent: navigator.userAgent,
    end_user_device_mac_address: '00:00:00:00:00:00', // Default MAC address
  };
};

// Base API method that handles GET and POST requests with automatic headers
const apiRequest = async (method, endpoint, data = null, customHeaders = {}) => {
  try {
    const token = localStorage.getItem("authToken");
    const locale = localStorage.getItem("locale") || "en";

    const requestHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Accept-Language": locale,
      ...customHeaders,
    };

    if (token) {
      requestHeaders["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios({
      method,
      url: `${API_BASE_URL}${endpoint}`,
      data,
      headers: requestHeaders,
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
  // General HTTP methods for flexible API usage
  get(endpoint, config = {}) {
    const params = config.params ? `?${new URLSearchParams(config.params).toString()}` : '';
    return apiRequest("get", `${endpoint}${params}`, null, config.headers);
  },

  post(endpoint, data, config = {}) {
    return apiRequest("post", endpoint, data, config.headers);
  },

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
  async searchFlight(payload) {
    try {
      const meta = await getMetaData();
      const searchPayload = {
        ...payload,
        "meta[end_user_ip_address]": meta.end_user_ip_address,
        "meta[end_user_browser_agent]": meta.end_user_browser_agent,
        "meta[end_user_device_mac_address]": meta.end_user_device_mac_address,
      };
      return apiRequest("get", `/tfusion/search/flights?${new URLSearchParams(searchPayload).toString()}`);
    } catch (error) {
      console.error('Failed to get metadata for flight search:', error.message);
      // Retry without IP metadata or show user-friendly error
      throw new Error('Unable to perform flight search. Please check your internet connection and try again.');
    }
  },

  // Booking flight
  async bookFlight(payload) {
    try {
      // Add meta data to booking payload
      const meta = await getMetaData();
      const bookingPayload = {
        ...payload,
        meta
      };
      return apiRequest("post", `/tfusion/bookings/process`, bookingPayload);
    } catch (error) {
      console.error('Failed to get metadata for flight booking:', error.message);
      // For booking, metadata might be required, so we throw a user-friendly error
      throw new Error('Unable to complete booking. Please check your internet connection and try again.');
    }
  },

  // Start booking
  startBooking(payload) {
    return apiRequest("post", `/tfusion/bookings/start`, payload);
  },

  // Create Stripe checkout session
  createStripeCheckout(payload) {
    return apiRequest("post", `/tfusion/bookings/stripe/checkout`, payload);
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
