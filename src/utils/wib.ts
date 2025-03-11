export const gmtToWib = (date: Date) => {
  return new Date(date.getTime() + 7 * 60 * 60 * 1000);
};
