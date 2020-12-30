import Color from "./Color";
import { randomRange } from "./Math";

export const getProperty = (property, values) => (obj) => {
  // Get values upwards
  const prop = obj[property];
  if (!prop) {
    new Error(`Property "${property}" doesn't exist.`);
  }

  return values.map((value) => prop[value]);
};

export const randomColor = () => {
  const r = randomRange(0, 255);
  const g = randomRange(0, 255);
  const b = randomRange(0, 255);

  return new Color(r, g, b);
};

export const scaleTo = (scalar, value) => {
  const newValue = value * scalar;
  return newValue;
};

export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const traverse = (obj, fn) => {
  if (obj.hasChildren()) {
    obj.getChildren().forEach(fn);
  }
};
