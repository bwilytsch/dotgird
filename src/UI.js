const btnStyle = {
  padding: "0.4rem 1.2rem",
  margin: "0 0.2rem"
};

export const applyStyle = (cssStyle, domElement) => {
  Object.keys(cssStyle).map((key) => {
    domElement.style[key] = cssStyle[key];
  });
};

export const createButton = (label, fn) => {
  const btn = document.createElement("button");
  btn.innerText = label;
  btn.onclick = fn;

  applyStyle(btnStyle, btn);

  return btn;
};
