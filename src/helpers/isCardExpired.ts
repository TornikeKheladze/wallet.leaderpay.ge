export const isCardExpired: (cardYear: number, cardMonth: number) => boolean = (
  cardYear,
  cardMonth
) => {
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  if (cardYear < currentYear) {
    return true;
  }

  if (cardYear === currentYear && cardMonth < currentMonth) {
    return true;
  }

  return false;
};
