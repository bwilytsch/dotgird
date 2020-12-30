export class Vector2 {
  constructor(x = 0, y = 0) {
    this._x = x;
    this._y = y;
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
  clone() {
    return this.constructor(this._x, this._y);
  }
  set(x, y) {
    if (!x && !y) return;

    if (x && !y) {
      this._x = x;
      this._y = y;
      return;
    }

    this._x = x;
    this._y = y;
  }
}

export class Vector3 {
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
  set(x, y, z) {
    this._x = x;
    this._y = y;
    this._z = z;

    this.handleChange();
    return this;
  }
  add(v0) {
    if (!v0) return;

    this._x += v0._x;
    this._y += v0._y;
    this._z += v0._z;
    return this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z);
  }
  copy(v0) {
    this._x = v0._x;
    this._y = v0._y;
    this._z = v0._z;
    return this;
  }
  mul(v0) {
    this._x *= v0.x;
    this._y *= v0.y;
    this._z *= v0.z;
    return this;
  }
  multiplyScalar(scalar) {
    this._x *= scalar;
    this._y *= scalar;
    this._z *= scalar;
    return this;
  }
  applyQuaternion(q) {
    const x = this._x,
      y = this._y,
      z = this._z;
    const qx = q._x,
      qy = q._y,
      qz = q._z,
      qw = q._w;

    // calculate quat * vector
    const ix = qw * x + qy * z - qz * y;
    const iy = qw * y + qz * x - qx * z;
    const iz = qw * z + qx * y - qy * x;
    const iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    this._x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    this._y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    this._z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

    return this;
  }
  onChange(cb) {
    if (typeof cb !== "function") return;
    this.handleChange = cb;
  }
  handleChange() {}
}
