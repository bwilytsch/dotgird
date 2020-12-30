import { Vector3 } from "./Vector";
import type from "./Types";

class Point extends Vector3 {
  constructor(...args) {
    super(...args);
    this._type = type.POINT;
  }
}

export default Point;
