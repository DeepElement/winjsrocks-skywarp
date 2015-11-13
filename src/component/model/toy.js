import WinJSRocks from "winjsrocks";
import BaseModel from "./base";

export default class extends BaseModel {

  constructor(options) {
    super(options);
    options = options || {};
    this._seller = null;
    this.contentType = "Toy";
    this._thumbnail = null;
  }

  get seller() {
    return this._seller;
  }

  set seller(val) {
    this._seller = val;
    this.notify("seller");
  }

  get thumbnail() {
    return this._thumbnail;
  }

  set thumbnail(val) {
    this._thumbnail = val;
    this.notify("thumbnail");
  }

};
