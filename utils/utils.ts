export function getContrastYIQ(hexcolor0: string, hexcolor1: string, hexcolor2: string) {
  hexcolor0 = hexcolor0.replace("#", "");

  const r = parseInt(hexcolor0.slice(0, 2), 16);
  const g = parseInt(hexcolor0.slice(2, 4), 16);
  const b = parseInt(hexcolor0.slice(4, 6), 16);

  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? hexcolor1 : hexcolor2;
}