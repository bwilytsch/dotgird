export class Matrix3 {
  static compose(...mats) {
    return mats.reduce((result, mat) => result.mul(mat), new Matrix3());
  }
  static apply(mat3, vec) {
    const clone = vec.clone();
    const x = mat3.a * clone.x + mat3.b * clone.y + mat3.tx * 1;
    const y = mat3.c * clone.x + mat3.d * clone.y + mat3.ty * 1;
    clone.set(x, y);
    return clone;
  }
  constructor(
    a = 1,
    b = 0,
    c = 0,
    d = 1,
    e = 0,
    f = 0,
    tx = 0,
    ty = 0,
    tz = 1
  ) {
    this.set(a, b, c, d, e, f, tx, ty, tz);
  }
  identity() {
    this.set(1, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  }
  compose(...mats) {
    mats.reduce((acc, mat) => acc.mul(mat), this);
    return this;
  }
  set(a, b, c, d, e, f, tx, ty, tz) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
    this.tx = tx;
    this.ty = ty;
    this.tz = tz;
    return this;
  }
  add(mat3) {
    const a1 = this.a + mat3.a;
    const b1 = this.b + mat3.b;
    const tx1 = this.tx + mat3.tx;

    const c1 = this.c + mat3.c;
    const d1 = this.d + mat3.d;
    const ty1 = this.ty + mat3.ty;

    const e1 = this.e + mat3.e;
    const f1 = this.f + mat3.f;
    const tz1 = this.tz + mat3.tz;

    this.set(a1, b1, c1, d1, e1, f1, tx1, ty1, tz1);

    return this;
  }
  mul(mat3) {
    //  a b tx
    //  c d ty
    //  e f tz

    const a1 = this.a * mat3.a + this.b * mat3.c + this.tx * mat3.e;
    const b1 = this.a * mat3.b + this.b * mat3.d + this.tx * mat3.f;
    const tx1 = this.a * mat3.tx + this.b * mat3.ty + this.tx * mat3.tz;

    const c1 = this.c * mat3.a + this.d * mat3.c + this.ty * mat3.e;
    const d1 = this.c * mat3.b + this.d * mat3.d + this.ty * mat3.f;
    const ty1 = this.c * mat3.tx + this.d * mat3.ty + this.ty * mat3.tz;

    const e1 = this.e * mat3.a + this.f * mat3.c + this.tz * mat3.e;
    const f1 = this.e * mat3.b + this.f * mat3.d + this.tz * mat3.f;
    const tz1 = this.e * mat3.tx + this.f * mat3.ty + this.tz * mat3.tz;

    this.set(a1, b1, c1, d1, e1, f1, tx1, ty1, tz1);

    return this;
  }
  mulScalar(scalar) {
    this.a *= scalar;
    this.b *= scalar;
    this.c *= scalar;
    this.d *= scalar;
    this.e *= scalar;
    this.f *= scalar;
    this.tx *= scalar;
    this.ty *= scalar;
    this.tz *= scalar;
    return this;
  }
  copy(mat3) {
    this.a = mat3.a;
    this.b = mat3.b;
    this.c = mat3.c;
    this.d = mat3.d;
    this.e = mat3.e;
    this.f = mat3.f;
    this.tx = mat3.tx;
    this.ty = mat3.ty;
    this.tz = mat3.tz;
    return this;
  }
  apply(vec) {
    const x = this.a * vec.x + this.b * vec.y + this.tx * 1;
    const y = this.c * vec.x + this.d * vec.y + this.ty * 1;
    vec.set(x, y);
    return this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  makeRotation(theta) {
    const c = Math.cos(theta);
    const s = Math.sin(theta);

    this.set(c, s, -s, c, 0, 0, 0, 0, 1);
  }
  makeTranslation(x, y) {
    this.set(1, 0, 0, 1, 0, 0, x, y, 1);
  }
  makeScale(x, y) {
    this.set(x, 0, 0, y, 0, 0, 0, 0, 1);
  }
  compute(position, scale, rotation) {
    this.compose();

    return this;
  }
}

export class Matrix4 {
  constrcutor() {
    this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  }
  set(
    n11,
    n12,
    n13,
    n14,
    n21,
    n22,
    n23,
    n24,
    n31,
    n32,
    n33,
    n34,
    n41,
    n42,
    n43,
    n44
  ) {
    // shortening the name
    const te = this.elements;
    te[0] = n11;
    te[4] = n12;
    te[8] = n13;
    te[12] = n14;
    te[1] = n21;
    te[5] = n22;
    te[9] = n23;
    te[13] = n24;
    te[2] = n31;
    te[6] = n32;
    te[10] = n33;
    te[14] = n34;
    te[3] = n41;
    te[7] = n42;
    te[11] = n43;
    te[15] = n44;
    return this;
  }
  identity() {
    this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  }
  makeTranslation(x, y, z) {
    this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
  }
  makeRotationX(theta) {
    const s = Math.sin(theta);
    const c = Math.cos(theta);
    this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
  }
  makeScale(x, y, z) {
    this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
  }
  compose(position, quaterion, scale) {
    // Creates matrix from all 3 props
  }
}

export const applyMatrix = (point, mat3) => {
  const px = point.x,
    py = point.y;
  const x = mat3.a * px + mat3.b * py + mat3.tx * 1;
  const y = mat3.c * px + mat3.d * py + mat3.ty * 1;
  return [x, y];
};
