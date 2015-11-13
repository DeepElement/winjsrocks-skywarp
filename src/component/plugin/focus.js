import WinJSRocks from "winjsrocks";
import $ from "jquery";

export default class extends WinJSRocks.Plugin.Base {

  constructor(application) {
    super(application, "focus");
  }

  loadComponent(options, callback) {
    var that = this;
    return super.loadComponent(options, function(err) {
      if (err)
        return callback(err);

      that.registerOrientationBindings();
      that.registerActiveFocusTimer();

      return callback();
    })
  }

  registerOrientationBindings() {
    if (WinJS.UI.XYFocus.keyCodeMap.up.indexOf(WinJS.Utilities.Key.upArrow) == -1)
      WinJS.UI.XYFocus.keyCodeMap.up.push(WinJS.Utilities.Key.upArrow);
    if (WinJS.UI.XYFocus.keyCodeMap.down.indexOf(WinJS.Utilities.Key.downArrow) == -1)
      WinJS.UI.XYFocus.keyCodeMap.down.push(WinJS.Utilities.Key.downArrow);
    if (WinJS.UI.XYFocus.keyCodeMap.left.indexOf(WinJS.Utilities.Key.leftArrow) == -1)
      WinJS.UI.XYFocus.keyCodeMap.left.push(WinJS.Utilities.Key.leftArrow);
    if (WinJS.UI.XYFocus.keyCodeMap.right.indexOf(WinJS.Utilities.Key.rightArrow) == -1)
      WinJS.UI.XYFocus.keyCodeMap.right.push(WinJS.Utilities.Key.rightArrow);
  }

  registerActiveFocusTimer() {
    var that = this;
    var previousFocusElement;
    setInterval(function() {
      var currentFocusElement = document.activeElement;

      // process the currently focused item
    }, 100);
  }
};
