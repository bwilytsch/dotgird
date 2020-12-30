import { Vector2 } from "./Vector";

// Used for collisions aka bouding box
export class Box2 {
  constructor() {
    this.min = new Vector2(Infinity, Infinity);
    this.max = new Vector2(-Infinity, -Infinity);
  }
  checkPoint(point) {
    if (point.x < this.min.x) {
      this.min.x = point.x;
    }

    if (point.y < this.min.y) {
      this.min.y = point.y;
    }

    if (point.x > this.max.x) {
      this.max.x = point.x;
    }

    if (point.y > this.max.y) {
      this.max.y = point.y;
    }
  }
  setFromPath(path) {
    path.forEach(this.checkPoint.bind(this));
    return this;
  }
}
