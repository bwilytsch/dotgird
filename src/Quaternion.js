class Quaternion {
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
  }
  set(x, y, z, w) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;

    this.handleChange();
    return this;
  }
  length() {
    return Math.sqrt(
      this._x * this._x +
        this._y * this._y +
        this._z * this._z +
        this._w * this._w
    );
  }
  mul(scalar) {
    this._x *= scalar;
    this._y *= scalar;
    this._z *= scalar;
    this._w *= scalar;
    return this;
  }
  normalize() {
    let l = this.length();
    if (l === 0) {
      this.set(0, 0, 0, 1);
    } else {
      l = 1 / l;
      this.mul(l);
    }
    this.handleChange();
    return this;
  }
  multiply(q) {
    return this.multiplyQuaternions(this, q);
  }
  multiplyQuaternions(a, b) {
    const qax = a._x;
    const qay = a._y;
    const qaz = a._z;
    const qaw = a._w;
    const qbx = b._x;
    const qby = b._y;
    const qbz = b._z;
    const qbw = b._w;

    this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
    this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
    this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
    this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

    this.handleChange();

    return this;
  }
  setFromAxisAngle(axis, angle) {
    const halfAngle = angle / 2;
    const s = Math.sin(halfAngle);

    // this.set(axis.x * s, axis.y * s, axis.z * s, Math.cos(halfAngle));
    this._x = axis.x * s;
    this._y = axis.y * s;
    this._z = axis.z * s;
    this._w = Math.cos(halfAngle);

    return this;
  }
  onChange(cb) {
    if (typeof cb !== "function") return;
    this.handleChange = cb;
  }
  handleChange() {}
}

export default Quaternion;
