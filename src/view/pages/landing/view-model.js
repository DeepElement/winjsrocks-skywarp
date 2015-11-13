import WinJSRocks from "winjsrocks";
import Moment from "moment";

export default class extends WinJSRocks.ViewModel.Base {
  constructor(application) {
    super(application);
    this._toys = [];
  }

  onDataSet(callback) {
    var that = this;

    return super.onDataSet(function() {

      // fetch toys and convert to ItemViewModels for binding
      var toyModels =that.DataService.getToyCollection().find();
      that._toys = that.addItemViewModels(toyModels);
      that.notify('toys');

      console.log(that._toys);

      return callback();
    });
  }

  get toys(){
    return this._toys;
  }

  get someActionCommand() {
    var that = this;
    return new WinJSRocks.Command.Base(function() {
      console.log("Action Executed!");
    });
  }
};
