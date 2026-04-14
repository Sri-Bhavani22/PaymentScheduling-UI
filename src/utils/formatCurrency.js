/**
 * Format a number as currency.
 * @param {number} amount
 * @param {string} currency - ISO 4217 code (default: 'INR')
 * @returns {string}
 */
export const formatCurrency = (amount, currency = 'INR') => {
  const localeMap = {
    INR: 'en-IN',
    USD: 'en-US',
    EUR: 'de-DE',
    GBP: 'en-GB',
  };
  const locale = localeMap[currency] || 'en-IN';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};
