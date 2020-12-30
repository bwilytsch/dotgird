import { randomRange, lerp } from "./Math";
import { clamp } from "./Math";

const isNumber = (value) => {
  return value !== null && value !== undefined && !Number.isNaN(value);
};

class Color {
  constructor(r, g, b) {
    this._r = r;
    this._g = g;
    this._b = b;
    this._a = 1;
  }
  get r() {
    return this._r;
  }
  get g() {
    return this._g;
  }
  get b() {
    return this._b;
  }
  get a() {
    return this._a;
  }
  setRGB(r, g, b) {
    if (!isNumber(r) || !isNumber(g) || !isNumber(b)) return;
    this._r = clamp(0, 255, r);
    this._g = clamp(0, 255, g);
    this._b = clamp(0, 255, b);
    return this;
  }
  setAlpha(alpha) {
    this._a = alpha;
    return this;
  }
  random() {
    this.r = randomRange(0, 255);
    this.g = randomRange(0, 255);
    this.b = randomRange(0, 255);
  }
  blend(c0, t) {
    this.r = lerp(this.r, c0.r, t);
    this.g = lerp(this.g, c0.g, t);
    this.b = lerp(this.b, c0.b, t);
    return this;
  }
  toString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }
}

export default Color;
