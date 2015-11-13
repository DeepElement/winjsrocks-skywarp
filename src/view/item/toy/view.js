import WinJSRocks from "winjsrocks";

export default class extends WinJSRocks.View.Control {
  ready() {
    var that = this;
    return super.ready.apply(this, arguments);
  }
}
