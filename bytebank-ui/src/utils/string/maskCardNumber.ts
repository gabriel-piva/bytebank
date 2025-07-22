export const maskCardNumber = (cardNumber: string): string => {
  if (!cardNumber) return "";
  if (cardNumber.length <= 4) return cardNumber;

  const lastDigits = cardNumber.slice(-4);
  const maskedPart = "****";
  return `${maskedPart} ${lastDigits}`;
};
