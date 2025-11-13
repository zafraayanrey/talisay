export const formatTin = (value) => {
  const numbers = value.replace(/\D/g, "").slice(0, 12); // only digits, max 12
  return numbers.replace(/(\d{3})(?=\d)/g, "$1-").replace(/-$/, "");
};
