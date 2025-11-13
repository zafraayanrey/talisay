export const formatNumber = (value) => {
  if (!value) return "";
  const num = value.toString().replace(/,/g, "");
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
