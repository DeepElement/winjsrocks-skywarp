import WinJSRocks from "winjsrocks";
import Async from "async";
import Moment from "moment";

export default class extends WinJSRocks.Service.Base {
  constructor(application) {
    super(application);
    this.MessageService = this.application.container.getService('message');
    this.DataService = this.application.container.getService('data');
  }

  loadComponent(options, callback) {
    var that = this;
    return super.loadComponent(options, function(err) {
      if (err)
        return callback(err);
      return callback();
    });
  }

  onApplicationReadyMessage() {
    var that = this;
    var startDate = new Date();
    that.update(function() {
      var endDate = new Date();
      var waitToLoadDiff = 5000 - new Moment(endDate).diff(new Moment(startDate));

      // at lesat 5s wait (because splash screens are branding!)
      setTimeout(function() {
        that.MessageService.send("dataSyncLoadedMessage");
      }, waitToLoadDiff);
    });
  }

  update(callback) {
    var that = this;

    var sampleToys = [{
      key: "optimus",
      title: "Optimus Prime",
      seller: 'todds-toy-shop',
      thumbnail: "http://vignette2.wikia.nocookie.net/video151/images/e/e1/Qwizards_-_Transformers_Summer_Edition_2014/revision/latest?cb=20140625225455"
    }];
    var sampleSellers = [{
      key: "todds-toy-shop",
      title: "Todd's Toy Shop",
      products: ['optimus']
    }];


    Async.parallel([
      function(done) {
        var toyCollection = that.DataService.getToyCollection();
        sampleToys.forEach(function(p) {
          var exists = toyCollection.findOne({
            key: p.key
          });
          if (!exists) {
            toyCollection.insert(p);
          }
        })
        return done();
      },
      function(done) {
        var sellerCollection = that.DataService.getSellerCollection();
        sampleSellers.forEach(function(p) {
          var exists = sellerCollection.findOne({
            key: p.key
          });
          if (!exists) {
            sellerCollection.insert(p);
          }
        })
        return done();
      }
    ], function(err) {
      if (callback)
        return callback();
    });
  }
}
