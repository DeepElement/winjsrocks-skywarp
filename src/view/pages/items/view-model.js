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
};
