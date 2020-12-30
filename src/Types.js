export const ARTBOARD = "Artboard";

// Building Blocks
export const BEZIERCURVE = "BezierCurve";
export const PATH = "Path";
export const POINT = "Point";
export const VECTOR = "Vector";

// Primitives
export const SHAPE = "Shape";
export const RECTANGLE = "Rectangle";
export const TRIANGLE = "Triangle";

export const isType = (obj, type) => {
  return obj._type === type;
};

export const isShape = (obj) => isType(obj, SHAPE);
export const isBezierCurve = (obj) => isType(obj, BEZIERCURVE);
export const isPoint = (obj) => isType(obj, POINT);

export default {
  ARTBOARD,
  BEZIERCURVE,
  PATH,
  POINT,
  VECTOR,
  SHAPE
};
