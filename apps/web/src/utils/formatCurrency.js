export const formatCurrency = (amount, currency2) => {
  return Intl.NumberFormat({
    style: "currency",
    currency: currency2,
  }).format(amount);
};
