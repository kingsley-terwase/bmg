/**
 * Validates the first step (amount selection)
 * @param {string} customAmount - The custom amount entered by user
 * @param {object} selectedGiftCard - The selected gift card object
 * @returns {object} Validation result with isValid flag and message
 */
export const validateStepOne = (customAmount, selectedGiftCard) => {
    const amount = parseFloat(customAmount || selectedGiftCard?.amount);

    if (!amount || amount < 10) {
        return {
            isValid: false,
            message: 'Please select or enter an amount of at least GH₵10'
        };
    }

    return { isValid: true };
};

/**
 * Validates the second step (personalization)
 * @param {object} formData - The form data object containing recipient and sender info
 * @returns {object} Validation result with isValid flag and message
 */
export const validateStepTwo = (formData) => {
    // Check required fields
    if (!formData.recipientName || !formData.recipientEmail ||
        !formData.senderName || !formData.senderEmail) {
        return {
            isValid: false,
            message: 'Please fill in all required fields'
        };
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.recipientEmail) || !emailRegex.test(formData.senderEmail)) {
        return {
            isValid: false,
            message: 'Please enter valid email addresses'
        };
    }

    return { isValid: true };
};

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};