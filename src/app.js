var WinJSRocks = require('winjsrocks'),
  WinJS = require('winjs'),
  WinJSRocksExtras = require('winjsrocks-extras'),
  $ = require('jquery');


// Require styles
//require('./css/default.less');

var app = new WinJSRocks.Application();

// Register App Views/Components
/*var viewKeys = [];
var itemKeys = [];
viewKeys.forEach(function(viewKey) {
  app.builder.registerView(
    viewKey,
    require('./views/' + viewKey + '/view'),
    require('./views/' + viewKey + '/view-model'),
    'views/' + viewKey + '/view.html');
});
itemKeys.forEach(function(item) {
  app.builder.registerDomainModel(item, require('./components/model/' + item));
  app.builder.registerDomainModelView(item,
    require('./item-templates/' + item + '/view'),
    require('./item-templates/' + item + '/view-model'),
    'item-templates/' + item + '/view.html');
});*/

// Start the WinJS App
WinJS.Application.start();

// https://msdn.microsoft.com/en-us/library/windows/apps/br212679.aspx
WinJS.Application.onactivated = function(e) {
  e.detail.setPromise(new WinJS.Promise(function(completed, error) {

    // Call configure on WinJSRocks
    app.configure({
      plugins: [
        //WinJSRocksExtras.Storage.IndexDBStoragePlugin
      ],
      instanceKey: "winjsrocks-skywarp"
    }, function(err) {
      if (err)
        return error(err);
      return completed();
    });

  }));
};

// https://msdn.microsoft.com/en-us/library/windows/apps/br229844.aspx
WinJS.Application.onready = function(e) {
  e.detail.setPromise(new WinJS.Promise(function(completed, error) {

    // Call Load on WinJSRocks
    app.load({}, function() {

      // Register the framework controlled navigation container
      var NavigationService = app.container.getService('navigation');

      document.body.appendChild(NavigationService.rootElement);

      // Setup the default page to load
      var messageService = app.container.getService("message");
      messageService.send("navigateToMessage", {
        viewKey: "splash"
      });

      return completed;
    });

  }));
};

// https://msdn.microsoft.com/en-us/library/windows/apps/br229845.aspx
WinJS.Application.onunload = function(e) {
  e.detail.setPromise(new WinJS.Promise(function(completed, error) {

    // Call Unload on WinJSRocks
    app.unload({},
      function() {
        console.log("app:unloaded");
      });

  }));
};

// https://msdn.microsoft.com/en-us/library/windows/apps/br229839.aspx
WinJS.Application.oncheckpoint = function(e) {

};

WinJS.Promise.onerror = function(event) {
  console.log(event);
};

WinJS.Application.onerror = function(e) {
  console.log(e);
  return true;
};
