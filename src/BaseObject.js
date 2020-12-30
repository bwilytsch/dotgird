import { uuidv4 } from "./utils";
import type, { isShape } from "./Types";

/**
 * Represents base entity
 *
 * @property {Array} children - Hold a reference to all children nodes. Default is empty
 * @property {Object} parent - Reference to parent node. Default is null
 *
 * @function addChild
 * @method removeChild
 * @method setParent
 * @method getParent
 * @method getChildren
 * @method hasChildren
 */

class BaseObject {
  constructor() {
    this._id = uuidv4();
    this._parent = null;

    /**
     * @NOTE replace with a Map potentially to avoid duplicates
     **/
    this._children = [];
  }
  get parent() {
    return this._parent;
  }
  get children() {
    return this._children;
  }
  addChild(child) {
    if (!isShape(child)) return;
    child.setParent(this);
    this.children.push(child);
    return this;
  }
  removeChild(child) {
    if (!isShape(child)) return;
    child.setParent(null);
    this.children = this.children.filter((c) => c !== child);
    return this;
  }
  getChildren() {
    return this.children;
  }
  hasChildren() {
    return this.getChildren().length > 0;
  }
  setParent(parent) {
    this._parent = parent;
    return this;
  }
  getParent() {
    return this.parent;
  }
}

export default BaseObject;
