import { format, formatDistanceToNow, isValid } from "date-fns";

/**
 * Format currency in Indian Rupees (INR)
 */
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Format Indian Price in Lacs/Crores
 */
export const formatShortPrice = (amount) => {
  if (!amount || isNaN(amount)) return "₹0";
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakh`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}k`;
  }
  return `₹${amount}`;
};

/**
 * Format Date (e.g., Nov 12, 2026)
 */
export const formatDate = (dateStr, formatPattern = "MMM dd, yyyy") => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (!isValid(date)) return "-";
  return format(date, formatPattern);
};

/**
 * Format Date & Time (e.g., Nov 12, 2026, 02:30 PM)
 */
export const formatDateTime = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (!isValid(date)) return "-";
  return format(date, "MMM dd, yyyy hh:mm a");
};

/**
 * Relative time ago
 */
export const formatRelativeTime = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (!isValid(date)) return "-";
  return formatDistanceToNow(date, { addSuffix: true });
};
