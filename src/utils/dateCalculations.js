export const calculateMonths = (startDate, endDate) => {
  if (!startDate || !endDate) return 1;

  const start = new Date(startDate);
  const end = new Date(endDate);

  const yearsDiff = end.getFullYear() - start.getFullYear();
  const monthsDiff = end.getMonth() - start.getMonth();
  const daysDiff = end.getDate() - start.getDate();

  let totalMonths = yearsDiff * 12 + monthsDiff;

  if (daysDiff > 7) {
    totalMonths += 1;
  }

  return Math.max(1, totalMonths);
};

export const getMinEndDate = (startDate) => {
  if (!startDate) return null;

  const date = new Date(startDate);
  date.setMonth(date.getMonth() + 1);

  return date.toISOString().split('T')[0];
};

export const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

export const formatDate = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
