/**
 * Authentication Logic
 */

const Auth = {
    /**
     * Login user
     * @param {string} username 
     * @param {string} password 
     */
    login: async (username, password) => {
        try {
            const data = await apiRequest('/auth/login', 'POST', { username, password }, false);
            if (data && data.access_token) {
                localStorage.setItem('token', data.access_token);
                window.location.href = 'select-doctor.html';
            } else {
                throw new Error('Login failed: No token received');
            }
        } catch (error) {
            UI.showAlert(error.message, 'error');
            throw error;
        }
    },

    /**
     * Register user
     * @param {object} userData 
     */
    register: async (userData) => {
        try {
            await apiRequest('/auth/register', 'POST', userData, false);
            UI.showAlert('Registration successful! Redirecting to login...', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        } catch (error) {
            UI.showAlert(error.message, 'error');
            throw error;
        }
    },

    /**
     * Logout user
     */
    logout: () => {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    },

    /**
     * Check if user is logged in
     * @returns {boolean}
     */
    isLoggedIn: () => {
        return !!localStorage.getItem('token');
    },

    /**
     * Get current user profile
     */
    getProfile: async () => {
        try {
            return await apiRequest('/auth/me', 'GET', null, true);
        } catch (error) {
            console.error("Failed to fetch profile", error);
            return null;
        }
    }
};
