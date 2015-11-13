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

      // Return the load callback now,
      //  load data then fire message
      callback();

      var messageService = that.application.container.getService('message');

      that.update(function() {
        messageService.send("dataSyncLoadedMessage");
      });
    });
  }


  update(callback) {

    setTimeout(function() {
      if (callback)
        return callback();
    }, 5000);
  }
}
