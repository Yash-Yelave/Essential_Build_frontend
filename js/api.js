const BASE_URL = "https://api.cureconnect.in/api";

/**
 * Helper function to make API requests
 * @param {string} endpoint - The API endpoint (e.g., "/auth/login")
 * @param {string} method - HTTP method (GET, POST, etc.)
 * @param {object} body - Request body (optional)
 * @param {boolean} authRequired - Whether to include the JWT token
 * @returns {Promise<any>} - The JSON response
 */
async function apiRequest(endpoint, method = "GET", body = null, authRequired = true) {
    const headers = {
        "Content-Type": "application/json",
    };

    if (authRequired) {
        const token = localStorage.getItem("token");
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        } else {
            // If auth is required but no token, redirect to login
            window.location.href = "login.html";
            return;
        }
    }

    const config = {
        method,
        headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, config);

        if (response.status === 401) {
            // Unauthorized - clear token and redirect to login
            localStorage.removeItem("token");
            window.location.href = "login.html";
            return;
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong");
        }

        return data;
    } catch (error) {
        console.error("API Request Error:", error);
        throw error;
    }
}
