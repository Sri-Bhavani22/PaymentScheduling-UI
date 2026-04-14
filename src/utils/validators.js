/**
 * Validate IFSC code (Indian bank branch code).
 * Format: 4 letters + 0 + 6 alphanumeric characters
 */
export const isValidIFSC = (value) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(value);

/**
 * Validate that a string contains only digits.
 */
export const isNumericString = (value) => /^\d+$/.test(value);

/**
 * Get status color for MUI Chip.
 */
export const getStatusColor = (status) => {
  const map = {
    Pending: 'info',
    Scheduled: 'info',
    Processing: 'warning',
    Completed: 'success',
    Failed: 'error',
    Cancelled: 'default',
  };
  return map[status] || 'default';
};
