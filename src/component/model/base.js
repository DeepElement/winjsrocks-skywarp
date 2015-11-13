import WinJSRocks from "winjsrocks";

export default class extends WinJSRocks.Model.Base {

  constructor(options) {
    super();
    options = options || {};
    this.secondaryKey = options.secondaryKey;
    this.title = options.title;
  }

  get key() {
    return this._key;
  }

  set key(val) {
    this._key = val;
    this.notify("key");
  }


  get title() {
    return this._title;
  }

  set title(val) {
    return this._title = val;
    this.notify('title');
  }

};
