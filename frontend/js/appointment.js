/**
 * Appointment Logic
 */

const Appointment = {
    /**
     * Get list of doctors
     */
    getDoctors: async () => {
        try {
            return await apiRequest('/doctors', 'GET', null, true);
        } catch (error) {
            console.error("Failed to fetch doctors", error);
            throw error;
        }
    },

    /**
     * Book an appointment
     * @param {string} doctorId 
     * @param {string} date 
     * @param {string} time 
     */
    bookAppointment: async (doctorId, date, time) => {
        try {
            const result = await apiRequest('/appointments', 'POST', {
                doctor_id: doctorId,
                appointment_date: date,
                appointment_time: time
            }, true);
            return result;
        } catch (error) {
            UI.showAlert(error.message, 'error');
            throw error;
        }
    },

    /**
     * Get token status
     */
    getTokenStatus: async () => {
        try {
            return await apiRequest('/appointments/token-status', 'GET', null, true);
        } catch (error) {
            console.error("Failed to fetch token status", error);
            return null; // Return null instead of throwing to avoid breaking auto-refresh
        }
    },

    /**
     * Get upcoming appointments
     */
    getUpcoming: async () => {
        try {
            return await apiRequest('/appointments/upcoming', 'GET', null, true);
        } catch (error) {
            console.error("Failed to fetch upcoming appointments", error);
            return [];
        }
    },

    /**
     * Get appointment history
     */
    getHistory: async () => {
        try {
            return await apiRequest('/appointments/history', 'GET', null, true);
        } catch (error) {
            console.error("Failed to fetch history", error);
            return [];
        }
    }
};
