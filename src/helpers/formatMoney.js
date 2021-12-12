export const formatToCurrency = amount => {
  const number = Number(amount);
  return number.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
};
