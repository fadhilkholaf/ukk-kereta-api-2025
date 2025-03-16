export const gmtToWib = (date: Date) => {
  return new Date(date.getTime() + 7 * 60 * 60 * 1000);
};

export const wibToGmt = (date: Date) => {
  return new Date(date.getTime() - 7 * 60 * 60 * 1000);
};

export const wibFormat = (date: Date) => {
  return Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
