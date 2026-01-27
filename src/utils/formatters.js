/**
 * Formats amount to Ghana Cedis currency format
 * @param {string|number} amount - The amount to format
 * @returns {string} Formatted amount string (e.g., "GH₵100.00")
 */
export const formatAmount = (amount) => {
  return `GH₵${parseFloat(amount).toLocaleString("en-GH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Parses amount string to float
 * @param {string} amount - The amount string to parse
 * @returns {number} Parsed amount as float
 */
export const parseAmount = (amount) => {
  return parseFloat(amount) || 0;
};
