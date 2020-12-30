export const randomRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const distanceTo = (x, y, target) => {
  const { x: x1, y: y1 } = target;
  var a = x1 - x;
  var b = y1 - y;
  return Math.sqrt(a * a + b * b);
};

export const lerp = (a, b, t) => {
  return t * b + (1 - t) * a;
};

export const clamp = (min, max, value) => {
  return value <= min ? min : value >= max ? max : value;
};
