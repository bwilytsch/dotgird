// Canvas experiment
// Gravity point
// Distance heuristics
import Color from "./Color";
import { Vector3 } from "./Vector";
import Artboard from "./Artboard";
import { createButton, applyStyle } from "./UI";
import Path from "./Path";
import Style from "./Style";
import Renderer from "./Renderer";
import { Rectangle, Ellipse } from "./Primitives";

import "./styles.css";

// Get delta time information
const Time = (() => {
  let prev = null;

  const clear = () => {
    prev = null;
  };

  // Time between each call
  const getDelta = () => {
    if (prev === null) {
      prev = performance.now();
    }

    const now = performance.now();
    const delta = now - prev;
    prev = now;

    return delta;
  };

  const getDeltaFromTimestamp = (timestamp) => {
    if (prev === null) {
      prev = timestamp;
    }

    const delta = timestamp - prev;
    prev = timestamp;

    if (Number.isNaN(delta)) return 0;

    return delta;
  };

  return Object.freeze({
    getDelta,
    getDeltaFromTimestamp,
    clear
  });
})();

const settings = {
  debug: false,
  fontSize: 24,
  size: 64,
  range: {
    min: 0.2,
    max: 1
  }
};

const UI = document.createElement("div");

const uiStyle = {
  position: "absolute",
  zIndex: 24,
  bottom: "24px",
  left: "24px",
  width: "calc(100% - 48px)"
};

applyStyle(uiStyle, UI);

document.body.appendChild(UI);

// const btn_debug = createButton(
//   "debug",
//   () => (settings.debug = !settings.debug)
// );
// UI.appendChild(btn_debug);

// FN

// const utilCanvas = ({ width, height }) => {
//   const c = document.createElement("canvas");
//   const _ctx = c.getContext("2d");

//   c.width = width || window.innerWidth;
//   c.height = height || window.innerHeight;

//   document.body.appendChild(c);
//   return [_ctx, c];
// };

// const [ctx, canvas] = utilCanvas({
//   width: window.innerWidth,
//   height: window.innerHeight
// });

const renderer = new Renderer("main", { autoClear: false });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const canvas = renderer.domElement;

// UI
// canvas.addEventListener("contextmenu", (e) => {
//   e.preventDefault();
//   console.log("Open context");
// });

// const rect = new Shape(new RectanglePath(), new Style());
// const rect2 = new Rectangle(0, 0, 128, 128, defaultStyle);

const ngon = (n, size) => {
  const step = (Math.PI * 2) / n;
  const halfStep = step / 2;
  const r = size;
  const path = new Path();

  for (let i = 0; i < n; i++) {
    const x = Math.cos(step * i - halfStep) * r;
    const y = Math.sin(step * i - halfStep) * r;
    const point = new Vector3(x, y, 0);
    path.add(point);
  }

  return path;
};

// Functional Programming style
// const Hexagon = pipe(
//   FillProperty("#FF0000"),
//   PathProperty(ngon(6, settings.size)),
//   TypeProperty("Path"),
//   ScaleProperty(1)
// );

// const Circle = pipe(
//   FillProperty("#FF0000"),
//   RadiusProperty(settings.size * 0.88),
//   TypeProperty("Circle")
// );

// Create Grid
const rows = 6;
const columns = 6;
let total = rows * columns;

// Calculate position in worldspace from given grid row and column index
const positionFromIndex = (idx, rows, columns, factor = 1) => {
  const needsOffset = Math.floor(idx / columns) % 2 === 0;
  const halfRow = rows / 2;
  const halfColumn = columns / 2;

  let y =
    Math.floor(idx / columns) * factor -
    halfColumn * factor +
    canvas.height / 2;
  let x = (idx % rows) * factor - halfRow * factor + canvas.width / 2;

  if (needsOffset) {
    x += factor / 2;
  }

  return { x, y };
};

// const blendColors = (c0, c1, t) => {
//   const r = lerp(c0.r, c1.r, t);
//   const g = lerp(c0.g, c1.g, t);
//   const b = lerp(c0.b, c1.b, t);

//   return new Color(r, g, b);
// };

const bb = {
  minX: Infinity,
  minY: Infinity,
  maxX: -Infinity,
  maxY: -Infinity
};

const updateBB = ({ x, y }, bb) => {
  if (bb.minX > x) {
    bb.minX = x;
  }

  if (bb.minY > y) {
    bb.minY = y;
  }

  if (bb.maxX < x) {
    bb.maxX = x;
  }

  if (bb.maxY < y) {
    bb.maxY = y;
  }
};

// const create = () => {
//   let count = 0;

//   while (count < total) {
//     let entity = null;

//     entity = Hexagon({
//       name: `hexagon-${count}`,
//       _id: count,
//       ...positionFromIndex(count, rows, columns, settings.size * 1.8)
//     });

//     updateBB(entity, bb);

//     entity.fill = colors.default;
//     arr.push(entity);

//     count++;
//   }
// };

// create();

const target = { x: Infinity, y: Infinity };
// const offset = { x: 0, y: 0 };

// const normalize = (value) => {
//   return value / canvas.width;
// };

// const clamp = (num, min, max) => {
//   return num <= min ? min : num >= max ? max : num;
// };

// const amplify = (value, factor = 1) => {
//   return Math.pow(value * factor, 2) / factor;
// };

// const flip = (value) => 1 - value;

// const clampFP = (min, max) => (value) => clamp(value, min, max);

// const amplifyFP = (factor) => (value) => amplify(value, factor);

// Effect via Functional Programming :D
// const growEffect = pipe(
//   normalize,
//   amplifyFP(12),
//   flip,
//   clampFP(settings.range.min, settings.range.max)
// );

// const update = (obj) => {
//   obj.x += offset.x;
//   obj.y += offset.y;
//   const dist = distanceTo(obj.x, obj.y, target);
//   const factor = growEffect(dist);

//   obj.fill = blendColors(colors.default, colors.hover, factor);
//   obj.scale = obj.fill.a = factor;
// };

const a1 = new Artboard("Test Artboard");

// Test Objects
const rectWithChild = new Rectangle(
  canvas.width / 2 - 32,
  canvas.height / 2 - 32,
  64,
  64
);

const handleTopLeft = new Rectangle(
  -rectWithChild.width / 2,
  -rectWithChild.height / 2,
  16,
  16
);

const handleTopRight = new Rectangle(
  rectWithChild.width / 2,
  -rectWithChild.height / 2,
  16,
  16
);

const handleBottomLeft = new Rectangle(
  -rectWithChild.width / 2,
  rectWithChild.height / 2,
  16,
  16
);

const handleBottomRight = new Rectangle(
  rectWithChild.width / 2,
  rectWithChild.height / 2,
  16,
  16
);

const handleOfHandle = new Rectangle(
  handleTopLeft.width / 2,
  handleTopLeft.height / 2,
  8,
  8
);

rectWithChild.addChild(handleTopLeft);
rectWithChild.addChild(handleTopRight);
rectWithChild.addChild(handleBottomLeft);
rectWithChild.addChild(handleBottomRight);

// Ellipse Test
const blue = new Style();
blue.fill.setRGB(0, 0, 255);
blue.stroke.setAlpha(0);

const circle = new Ellipse(0, 0, 32, 32, blue);
const circle1 = new Ellipse(32, 32, 64, 64, blue);
circle1.visible = false;

handleTopLeft.addChild(handleOfHandle);
rectWithChild.addChild(circle);
rectWithChild.addChild(circle1);

a1.addChild(rectWithChild);

new Array(4)
  .fill()
  .forEach(() =>
    a1.addChild(
      new Rectangle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        64,
        64
      )
    )
  );

const addRect = () => {
  a1.addChild(
    new Rectangle(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      64,
      64
    )
  );
};

const render = (delta) => {
  renderer.render(a1);
};

const ele = canvas;

let prev = null;

const pointInBB = (x, y, bb) => {
  return x > bb.minX && x < bb.maxX && y > bb.minY && y < bb.maxY;
};

const getMousePosition = (e) => {
  const { left, top } = ele.getBoundingClientRect();
  let x = e.pageX - left;
  let y = e.pageY - top;

  // if (!pointInBB(x, y, bb)) {
  //   target.x = -Infinity;
  //   target.y = -Infinity;
  //   return;
  // }

  // Overwrite with touchevents
  if (e.changedTouches) {
    x = e.changedTouches[0].pageX;
    y = e.changedTouches[0].pageY;
  }

  if (!prev) {
    prev = { x, y };
  }

  // offset.x = x - canvas.width / 2;
  // offset.y = prev.y - y;

  target.x = x;
  target.y = y;

  // Update
  prev.x = x;
  prev.y = y;
};

let rAF = null;

const update = (delta) => {
  // const newScale = 2 * Math.sin(now * 0.001) + 0.2;
  // a1.getChildren().forEach((rect) => {
  //   rect.rotation.x += 0.01;
  //   rect.scale.x = rect.scale.y = newScale;
  //   // updates matrix
  //   rect.updateMatrix();
  // });
  // Might be expensive to do this
  const scale = Math.sin(performance.now() * delta * 0.0001);
  rectWithChild.rotation.x -= delta * 0.005;
  rectWithChild.scale.x += scale * 0.02;
  rectWithChild.scale.y += scale * 0.02;
  rectWithChild.updateMatrix();
};

const animate = (timestamp) => {
  const delta = Time.getDeltaFromTimestamp(timestamp);
  update(delta);
  render(delta);
  rAF = requestAnimationFrame(animate);
};

const start = () => {
  stop();
  animate();
};

const stop = () => {
  cancelAnimationFrame(rAF);
};

// Used for some initial experiments
// const introAnimation = () => {
//   const len = arr.length;
//   const duration = 2;

//   const stepDuration = (duration / len) * 1.2;
//   const stepDelay = duration / len;

//   arr.forEach((shape, idx) => {
//     // Fade In
//     gsap.fromTo(
//       shape,
//       { scale: 0 },
//       {
//         scale: 0.2,
//         duration: stepDuration,
//         delay: idx * stepDelay,
//         onUpdate: () => draw(shape)
//       }
//     );
//     gsap.fromTo(
//       shape.fill,
//       { a: 0 },
//       {
//         a: 1,
//         duration: stepDuration,
//         delay: idx * stepDelay,
//         onUpdate: () => draw(shape),
//         onComplete: () => {
//           if (idx === arr.length - 1 && !appState.isRunning) {
//             animate();
//             appState.isRunning = true;
//           }
//         }
//       }
//     );
//   });
// };

const startBtn = createButton("Start", start);
UI.appendChild(startBtn);

const stopBtn = createButton("Stop", stop);
UI.appendChild(stopBtn);

const moveButton = createButton("Move Right", () => {
  rectWithChild.translateX(10).updateMatrix();
  render();
});

const rotateButton = createButton("Rotate CW", () => {
  rectWithChild.rotateX(Math.PI / 12).updateMatrix();
  render();
});

const scaleButton = createButton("Scale", () => {
  rectWithChild.scale.x += 0.1;
  rectWithChild.scale.y += 0.1;
  rectWithChild.updateMatrix();
  render();
});

const addRectButton = createButton("Add Rectangle", () => {
  addRect();
  render();
});

const zoomFactor = 0.1;

const zoomDirections = {
  in: new Vector3(1, 1, 0),
  out: new Vector3(-1, -1, 0)
};

Object.keys(zoomDirections).forEach((key) => {
  const tmpBtn = createButton(`Zoom ${key}`, () => {
    const dir = zoomDirections[key];
    a1.zoomOnAxis(dir, zoomFactor).computeMatrix();
    // Print value for e.g UI later
    console.log(`zoom: ${Math.round(a1.zoom * 100)}%`);
    render();
  });
  UI.appendChild(tmpBtn);
});

const paneDirections = {
  left: new Vector3(-1, 0, 0),
  right: new Vector3(1, 0, 0),
  up: new Vector3(0, -1, 0),
  down: new Vector3(0, 1, 0),
  topLeft: new Vector3(-1, -1, 0)
};

const paneStep = 24;

Object.keys(paneDirections).forEach((key) => {
  const tmpBtn = createButton(`Pane ${key}`, () => {
    const dir = paneDirections[key];
    a1.paneOnAxis(dir, paneStep).computeMatrix();
    render();
  });
  UI.appendChild(tmpBtn);
});

UI.appendChild(moveButton);
UI.appendChild(rotateButton);
UI.appendChild(scaleButton);
UI.appendChild(addRectButton);

const resize = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  render();
};

canvas.addEventListener("mousemove", getMousePosition);
canvas.addEventListener("mouseleave", () => {
  target.x = -Infinity;
  target.y = -Infinity;
});
window.addEventListener("resize", resize);

// Kick things off
render();
