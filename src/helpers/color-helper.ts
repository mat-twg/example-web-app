export const parseColor = (colorRGBA: string): RegExpMatchArray | null => {
  return colorRGBA
    .replace(/\s/g, '')
    .match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
};

export const contrast = (colorRGB: string): string | null => {
  const rgb = parseColor(colorRGB);
  if (rgb === null) {
    return null;
  }
  return (Math.round(+rgb[1] * 299) +
    Math.round(+rgb[2] * 587) +
    Math.round(+rgb[3] * 114)) /
    1000 >=
    128
    ? 'black'
    : 'white';
};

export const rgba2rgb = (
  colorRGBA: string,
  bgR: number,
  bgG: number,
  bgB: number,
): string | null => {
  const rgb = parseColor(colorRGBA);
  if (rgb === null) {
    return null;
  }
  const alpha = +((rgb && rgb[4]) || '').trim();
  let r = Math.round((1 - alpha) * bgR + alpha * +rgb[1]);
  let g = Math.round((1 - alpha) * bgG + alpha * +rgb[2]);
  let b = Math.round((1 - alpha) * bgB + alpha * +rgb[3]);
  return `rgb(${r},${g},${b})`;
};
