import WinJSRocks from "winjsrocks";

export default class extends WinJSRocks.ViewModel.Item {
  onDataSet(callback) {
    var that = this;
    return super.onDataSet(function(err) {
      if (err)
        return callback(err);

      return callback();
    })
  }

  get navigateToItemCommand() {
    var that = this;
    return new WinJSRocks.Command.Base(function(key) {
      that.MessageService.send("navigateToMessage", {
        viewKey: "seller-detail",
        state: {
          key: that.item.key
        }
      });
    });
  }

};
