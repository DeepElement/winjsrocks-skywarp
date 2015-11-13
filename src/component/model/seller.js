import WinJSRocks from "winjsrocks";
import BaseModel from "./base";

export default class extends BaseModel {

  constructor(options) {
    super();
    options = options || {};
    this._products = [];
  }

  get products() {
    return this._products;
  }

  set products(val) {
    this._products = val;
    this.notify("products");
  }

};
