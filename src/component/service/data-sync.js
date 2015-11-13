import WinJSRocks from "winjsrocks";

export default class extends WinJSRocks.Service.Base {
  constructor(application) {
    super(application);
  }

  loadComponent(options, callback) {
    var that = this;
    return super.loadComponent(options, function(err) {
      if (err)
        return callback(err);
      return callback();
    });
  }
}
