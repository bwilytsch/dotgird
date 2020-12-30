import Quaternion from "./Quaternion";
/**
 * Euler Object
 * Needs additional methods to convert from and to Quaternion, derive from matrix etc.
 * see: https://vanruesc.github.io/math-ds/docs/file/src/Euler.js.html
 */

export default class Euler {
  constructor(x = 0, y = 0, z = 0) {
    this._x = x;
    this._y = y;
    this._z = z;
  }
  get x() {
    return this._x;
  }
  set x(value) {
    this._x = value;
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = value;
  }

  get z() {
    return this._z;
  }

  set z(value) {
    this._z = value;
  }

  fromMatrix(mat3) {
    return this;
  }
  fromQuaternion(q) {
    return this;
  }

  toQuaternion() {
    return new Quaternion();
  }
}
