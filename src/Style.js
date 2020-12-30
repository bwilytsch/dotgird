import { uuidv4 } from "./utils";
import Color from "./Color";

class Style {
  constructor() {
    this._id = uuidv4();
    this.fill = new Color(255, 255, 255);
    this.stroke = new Color();
  }
}

export default Style;
