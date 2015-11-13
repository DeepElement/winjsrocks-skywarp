import WinJSRocks from "winjsrocks";
import BaseModel from "./base";

export default class extends BaseModel {

  constructor(options) {
    super();
    options = options || {};
    this._seller = null;
  }

  get seller() {
    return this._seller;
  }

  set seller(val) {
    this._seller = val;
    this.notify("seller");
  }
  
};
