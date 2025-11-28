/**
 * UI Utility Functions
 */

const UI = {
    /**
     * Show an alert message
     * @param {string} message - The message to display
     * @param {string} type - 'success' or 'error'
     */
    showAlert: (message, type = 'success') => {
        const alertDiv = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-success' : 'bg-error';
        alertDiv.className = `${bgColor} text-white fixed top-5 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg font-medium min-w-[300px] text-center transition-all duration-300 opacity-0 translate-y-[-10px]`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="ml-4 opacity-70 hover:opacity-100 font-bold" onclick="this.parentElement.remove()">×</button>
        `;
        document.body.appendChild(alertDiv);

        // Animate in
        requestAnimationFrame(() => {
            alertDiv.classList.remove('opacity-0', 'translate-y-[-10px]');
        });

        // Auto dismiss after 3 seconds
        setTimeout(() => {
            alertDiv.classList.add('opacity-0', 'translate-y-[-10px]');
            setTimeout(() => alertDiv.remove(), 300);
        }, 3000);
    },

    /**
     * Show loading spinner on a button
     * @param {HTMLElement} button - The button element
     * @param {string} text - The text to show while loading (optional)
     */
    showLoading: (button, text = 'Loading...') => {
        button.dataset.originalText = button.innerHTML;
        button.disabled = true;
        button.classList.add('opacity-75', 'cursor-not-allowed');
        button.innerHTML = `
            <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            ${text}
        `;
    },

    /**
     * Hide loading spinner on a button
     * @param {HTMLElement} button - The button element
     */
    hideLoading: (button) => {
        button.disabled = false;
        button.classList.remove('opacity-75', 'cursor-not-allowed');
        button.innerHTML = button.dataset.originalText || 'Submit';
    }
};
