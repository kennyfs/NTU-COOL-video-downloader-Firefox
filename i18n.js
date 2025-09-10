// i18n.js - Simple internationalization utility
// Keep it simple, stupid. No fancy framework needed.

const i18n = {
    // Get localized message from browser extension API
    getMessage: function(key, substitutions) {
        return browser.i18n.getMessage(key, substitutions) || key;
    },

    // Initialize i18n for DOM elements
    initializeDOM: function() {
        // Find all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const message = this.getMessage(key);

            // Update text content
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = message;
            } else {
                // 安全地更新文字內容，避免 XSS
                element.textContent = message;
            }
        });

        // Handle title attributes
        const titleElements = document.querySelectorAll('[data-i18n-title]');
        titleElements.forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.getMessage(key);
        });
    },

    // Format message with substitutions
    format: function(key, ...substitutions) {
        return this.getMessage(key, substitutions);
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => i18n.initializeDOM());
} else {
    i18n.initializeDOM();
}
