import Path from "./Path";
import Point from "./Point";
import { Vector3 } from "./Vector";
import BezierCurve from "./BezierCurve";
import Shape from "./Shape";
import Style from "./Style";

const _defaultStyle = new Style();

export function RectanglePath(width, height) {
  const p = new Path();

  // From center
  const hw = width / 2;
  const hh = height / 2;

  p.add(new Point(-hw, -hh));
  p.add(new Point(hw, -hh));
  p.add(new Point(hw, hh));
  p.add(new Point(-hw, hw));

  return p;
}

const getPointAtAngle = (angle, center, radius) => {
  return radius
    .clone()
    .mul(new Vector3(Math.cos(angle), Math.sin(angle), 0))
    .add(center);
};

const getRelativeControlPoints = (startAngle, endAngle, radius) => {
  const factor = getApproximationFactor(startAngle, endAngle);
  const distToCtrlPoint = Math.sqrt(
    radius.x * radius.x * (1 + factor * factor)
  );
  const distToCtrlPoint2 = Math.sqrt(
    radius.y * radius.y * (1 + factor * factor)
  );

  const angle1 = startAngle + Math.atan(factor);
  const angle2 = endAngle - Math.atan(factor);
  return [
    new Vector3(
      Math.cos(angle1) * distToCtrlPoint,
      Math.sin(angle1) * distToCtrlPoint2,
      0
    ),
    new Vector3(
      Math.cos(angle2) * distToCtrlPoint,
      Math.sin(angle2) * distToCtrlPoint2,
      0
    )
  ];
};
const getApproximationFactor = (startAngle, endAngle) => {
  // Returns a mutliplication constant with an inaccuracy of 1.96×10^-4
  let arc = endAngle - startAngle;
  if (Math.abs(arc) > Math.PI) {
    arc -= Math.PI * 2;
    arc %= Math.PI * 2;
  }
  return (4 / 3) * Math.tan(arc / 4);
};

const _origin = new Vector3();

// Max 90 degrees
const createArc = (radius, startAngle, endAngle, angleOffset = 0) => {
  const [c1, c2] = getRelativeControlPoints(startAngle, endAngle, radius);

  return new BezierCurve().set(
    getPointAtAngle(startAngle, _origin, radius),
    getPointAtAngle(endAngle, _origin, radius),
    c1.add(_origin),
    c2.add(_origin)
  );
};

export function EllipsePath(width, height) {
  const p = new Path();

  const radius = new Vector3(width / 2, height / 2);

  for (let i = 0; i < 4; i++) {
    const startAngle = (Math.PI / 2) * i;
    const endAngle = (Math.PI / 2) * (i + 1);

    const arc = createArc(radius, startAngle, endAngle);

    p.add(arc);
  }

  return p;
}

export function Rectangle(x, y, width, height, style = _defaultStyle) {
  const r = new Shape(new RectanglePath(width, height), style).updateMatrix();
  r.position.set(x, y, 0);
  return r;
}

export function Ellipse(x, y, width, height, style = _defaultStyle) {
  const e = new Shape(new EllipsePath(width, height), style).updateMatrix();
  e.position.set(x, y, 0);
  return e;
}
