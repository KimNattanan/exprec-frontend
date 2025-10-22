export function getContrastYIQ(hexcolor0: string, hexcolor1: string, hexcolor2: string) {
  hexcolor0 = hexcolor0.replace("#", "");

  const r = parseInt(hexcolor0.slice(0, 2), 16);
  const g = parseInt(hexcolor0.slice(2, 4), 16);
  const b = parseInt(hexcolor0.slice(4, 6), 16);

  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? hexcolor1 : hexcolor2;
}

export const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
export const monthNamesAbbr = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
export function formatDateTime(date: Date){
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return [date.getDate(), monthNames[date.getMonth()], date.getFullYear(), `${hours}:${minutes}:${seconds}`];
}