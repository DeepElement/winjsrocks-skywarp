import WinJSRocks from "winjsrocks"

export default class extends WinJSRocks.View.Page {
  ready(element, options) {
    var that = this;

    var listView = $('#toysListView').get(0);
    var listViewDataList = new WinJS.Binding.List(that.viewModel.toys);
    listView.winControl.itemDataSource = listView.dataSource;
    listView.winControl.forceLayout();

    return super.ready(element, options);
  }
};
