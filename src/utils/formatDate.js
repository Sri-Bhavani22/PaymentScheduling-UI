import dayjs from 'dayjs';

/**
 * Format a date string or Date object.
 * @param {string|Date} date
 * @param {string} format - Day.js format string (default: 'DD MMM YYYY')
 * @returns {string}
 */
export const formatDate = (date, format = 'DD MMM YYYY') => {
  return dayjs(date).format(format);
};

/**
 * Format a date with time.
 * @param {string|Date} date
 * @returns {string}
 */
export const formatDateTime = (date) => {
  return dayjs(date).format('DD MMM YYYY, hh:mm A');
};
