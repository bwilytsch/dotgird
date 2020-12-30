import BaseObject from "./BaseObject";
import { Matrix3 } from "./Matrix";
import { getProperty } from "./utils";
import { Vector3 } from "./Vector";
import type from "./Types";

// This is a Root Object

/**
 * @TODO Make a general helper for axis
 * @TODO Create Base class for children, addChild, removeChild, parent <-> child, implementation/interface
 * @TODO Use increments/step for zoom factor, e.g 12.5%, 25%, 50%, 100%, 200%
 * @TODO Zoom from and to any arbitary point
 */

// Axis
const _xAxis = new Vector3(1, 0, 0);
const _yAxis = new Vector3(0, 1, 0);
// const _zAxis = new Vector3(0, 0, 1);

const _zm = new Matrix3();
const _pm = new Matrix3();

// Used as buffer object
const _v = new Vector3();

const getZoom = getProperty("_zoom", ["x", "y"]);
const getPane = getProperty("_offset", ["x", "y"]);

class Artboard extends BaseObject {
  constructor(name = "Artboard", width = 512, height = 512) {
    super();
    this._type = type.ARTBOARD;

    // Dimensions
    this._width = width;
    this._height = height;

    this._visible = true;

    this.name = name;

    // Equivalent to scale and position on shapes
    this._zoom = new Vector3(1, 1, 1);
    this._offset = new Vector3(0, 0, 0);

    this._matrix = new Matrix3();
    this._matrixNeedsUpdate = true;
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  get zoom() {
    return this._zoom.x;
  }

  isVisible() {
    return this._visible;
  }
  zoomOnAxis(axis, distance) {
    // @TODO: Do quaternion method here
    // @TODO: Zoom needs to happen from center of the screen OR mouseposition
    _v.copy(axis).multiplyScalar(distance);
    this._zoom.add(_v);
    this.updateMatrix();
    return this;
  }
  zoomX(distance) {
    this.zoomOnAxis(_xAxis, distance);
    return this;
  }
  zoomY(distance) {
    this.zoomOnAxis(_yAxis, distance);
    return this;
  }
  paneOnAxis(axis, distance) {
    _v.copy(axis).multiplyScalar(distance);
    this._offset.add(_v);
    this.updateMatrix();
    return this;
  }
  paneX(distance) {
    this.paneOnAxis(_xAxis, distance);
    return this;
  }
  paneY(distance) {
    this.paneOnAxis(_xAxis, distance);
    return this;
  }
  computeMatrix() {
    if (!this._matrixNeedsUpdate) return;

    // Reset current matrix;
    this._matrix.identity();

    // Root node, no parent matrix multiplication required

    // Compute Zoom Matrix
    _zm.identity().makeScale(...getZoom(this));
    // Compute Pane Matrix
    _pm.identity().makeTranslation(...getPane(this));

    this._matrix.compose(_pm, _zm);

    // console.log(this._matrix);

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

export default Artboard;
