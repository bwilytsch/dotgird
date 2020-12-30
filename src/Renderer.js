import { applyMatrix } from "./Matrix";
import { traverse, uuidv4 } from "./utils";
import { isBezierCurve, isPoint } from "./Types";

/**
 * @param {*} shapeRenderFn
 */
const render = (shapeRenderFn) => (ctx, obj) => {
  if (!obj.isVisible()) return;

  if (!obj || !ctx) return;

  const { fill, stroke } = obj.style;

  ctx.beginPath();

  shapeRenderFn(ctx, obj);

  ctx.closePath();

  ctx.save();

  if (fill) {
    ctx.fillStyle = fill.toString();
    ctx.fill();
  }

  if (stroke) {
    ctx.strokeStyle = stroke.toString();
    ctx.stroke();
  }

  ctx.restore();
  return obj;
};

// @NOTE: Include memoization
/**
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {*} data
 */
const pathRenderer = (ctx, data) => {
  const { path, _matrix } = data;

  data.computeMatrix();
  // Add memoization to points key: `${x},${y}`

  path.forEach((node, idx) => {
    if (isPoint(node)) {
      if (idx === 0) {
        ctx.moveTo(...applyMatrix(node, _matrix));
      } else {
        ctx.lineTo(...applyMatrix(node, _matrix));
      }
    }

    if (isBezierCurve(node)) {
      // Output: [p0x, p0y, c0x, c0y, c1x, c1y, p1x, p1y]
      const [startPointX, startPointY, ...rest] = node.applyMatrix(_matrix);

      if (idx === 0) {
        ctx.moveTo(startPointX, startPointY);
      }

      ctx.bezierCurveTo(...rest);
    }
  });

  // Assuming :D
  ctx.closePath();
};

/**
 * Hold the canvas object
 *
 */

const defaultParams = {
  autoClear: true
};

class Renderer {
  constructor(name, params = {}) {
    this._id = uuidv4();
    this._canvas = document.createElement("canvas");
    this._ctx = this._canvas.getContext("2d");

    // Properties
    console.log(params);
    this._autoClear =
      params.autoClear !== undefined
        ? params.autoClear
        : defaultParams.autoClear;

    this.name = name;
  }
  get width() {
    return this._canvas.width;
  }
  get height() {
    return this._canvas.height;
  }
  get domElement() {
    return this._canvas;
  }
  setSize(width, height) {
    this._canvas.width = width;
    this._canvas.height = height;
  }
  _r(obj) {
    if (obj.path) {
      renderPath(this._ctx, obj);
    }

    traverse(obj, this._r.bind(this));
  }
  render(obj) {
    // Render function here
    if (this._autoClear) this.clear();
    this._r(obj);
  }
  clear() {
    this._ctx.clearRect(0, 0, this.width, this.height);
  }
}

export const renderPath = render(pathRenderer);

export default Renderer;
