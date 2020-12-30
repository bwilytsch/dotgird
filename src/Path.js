import type, { isType } from "./Types";
import { uuidv4 } from "./utils";

class Path {
  constructor() {
    this._id = uuidv4();
    this._points = [];
  }
  get points() {
    return this._points;
  }
  forEach(fn) {
    this._points.forEach(fn);
    return this;
  }
  add(point) {
    if (!isType(point, type.POINT) && !isType(point, type.BEZIERCURVE)) return;
    this._points.push(point);
    return this;
  }
}

export default Path;
