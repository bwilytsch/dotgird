import type from "./Types";
import { applyMatrix } from "./Matrix";
import Point from "./Point";
/**
 * Bezier has multiple points
 */

class BezierCurve {
  constructor() {
    this._type = type.BEZIERCURVE;
    // p0: startPoint, p1: endPoint, c0: firstControlPoint, c1: secondControlPoint
    this._points = [new Point(), new Point(), new Point(), new Point()];
  }
  get p0() {
    return this._points[0];
  }

  get p1() {
    return this._points[1];
  }
  get c0() {
    return this._points[2];
  }
  get c1() {
    return this._points[3];
  }

  set(p0, p1, c0, c1) {
    this._points[0].copy(p0);
    this._points[1].copy(p1);
    this._points[2].copy(c0);
    this._points[3].copy(c1);
    return this;
  }

  fromPoint(point) {
    this._points.forEach((p) => p.copy(point));
    return this;
  }
  applyMatrix(mat3) {
    const p0 = applyMatrix(this.p0, mat3);
    const p1 = applyMatrix(this.p1, mat3);
    const c0 = applyMatrix(this.c0, mat3);
    const c1 = applyMatrix(this.c1, mat3);

    return [...p0, ...c0, ...c1, ...p1];
  }
}

export default BezierCurve;
