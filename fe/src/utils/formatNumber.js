

export const formatNumber = (number, locale = 'vi-VN') => {
  return new Intl.NumberFormat(locale).format(number);
};
