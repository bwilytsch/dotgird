import { Matrix3 } from "./Matrix";
import { Vector3 } from "./Vector";
import { getProperty } from "./utils";
import Euler from "./Euler";
import Quaternion from "./Quaternion";
import { Box2 } from "./Box";
import type from "./Types";
import BaseObject from "./BaseObject";

// Global re-usable vector3
const _v1 = new Vector3();

// Axis
const _xAxis = new Vector3(1, 0, 0);
const _yAxis = new Vector3(0, 1, 0);
const _zAxis = new Vector3(0, 0, 1);

// Buffer Matrices
const _tm = new Matrix3();
const _rm = new Matrix3();
const _sm = new Matrix3();

// Helper function for recursion
const getPosition = getProperty("position", ["x", "y"]);
const getRotation = getProperty("rotation", ["x"]);
const getScale = getProperty("scale", ["x", "y"]);

class Shape extends BaseObject {
  constructor(path, style) {
    super();
    this._type = type.SHAPE;
    this._visible = true;

    this.name = "";

    this.position = new Vector3();
    this.quaternion = new Quaternion();
    this.rotation = new Euler();
    this.scale = new Vector3(1, 1, 1);

    this.path = path;
    this.style = style;

    this.boundingBox = new Box2().setFromPath(path);

    /**
     * Used to change points during render
     */
    this._matrix = new Matrix3();
    this._matrixNeeedsUpdate = false;
  }

  get width() {
    return this.boundingBox.max.x - this.boundingBox.min.x;
  }

  get height() {
    return this.boundingBox.max.y - this.boundingBox.min.y;
  }

  get visible() {
    return this._visible;
  }

  set visible(value) {
    this._visible = value;
  }

  isVisible() {
    return this._visible;
  }

  translateOnAxis(axis, distance) {
    // Get direction, might not be too useful for fixed axis in 2D space
    _v1.copy(axis).applyQuaternion(this.quaternion);

    // Set length of direction & apply it to position
    this.position.add(_v1.multiplyScalar(distance));

    this.updateMatrix();

    return this;
  }
  translateX(distance) {
    this.translateOnAxis(_xAxis, distance);
    return this;
  }
  translateY(distance) {
    this.translateOnAxis(_yAxis, distance);
    return this;
  }
  translateZ(distance) {
    this.translateOnAxis(_zAxis, distance);
    return this;
  }
  rotateX(theta) {
    // @TODO: Replace with a rotateAroundAxis fn later
    this.rotation.x += theta;

    this.updateMatrix();

    return this;
  }
  computeBoundingBox() {
    return this;
  }
  computeMatrix() {
    // this will be picked up when needed
    if (!this._matrixNeedsUpdate) return;

    /**
     * Memoization here?
     * e.g since it's in a homogenous vector system
     * Reusing buffer matrices
     * Get transform matrix from parent
     */

    // Reset Matrix
    this._matrix.identity();

    // Use parents matrix
    if (this.getParent()) {
      // console.log(this.parent._type, this.parent._matrix);
      this._matrix.mul(this.parent._matrix);
    }

    // Reset and apply new transforms
    // This could be on the Matrix3 object like ThreeJS does is
    _tm.identity().makeTranslation(...getPosition(this));
    _rm.identity().makeRotation(...getRotation(this));
    _sm.identity().makeScale(...getScale(this));

    this._matrix.compose(_tm, _rm, _sm);

    if (this.hasChildren()) {
      this.getChildren().forEach((child) => child.updateMatrix());
    }

    this._matrixNeedsUpdate = false;
    return this;
  }
  updateMatrix() {
    this._matrixNeedsUpdate = true;
    return this;
  }
}

export default Shape;
