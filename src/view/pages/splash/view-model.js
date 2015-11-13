import WinJSRocks from "winjsrocks";
import Moment from "moment";

export default class extends WinJSRocks.ViewModel.Base {
  constructor(application) {
    super(application);
  }

  onDataSet(callback) {
    var that = this;

    return super.onDataSet(function() {
      // fetch my data
      return callback();
    });
  }

  get isModal() {
    return true;
  }

  onInitialDataLoadedMessage() {
    var that = this;
    this.MessageService.unregister("initialDataLoadedMessage", this.onInitialDataLoadedMessageBinding);
    that.MessageService.send("navigateToMessage", {
      viewKey: "landing"
    });
  }
};
