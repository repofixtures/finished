cordova.define("org.intel.context", function(require, exports, module) {var onReceivedItemCallback = null;
var onErrorCallback = null;

var context = {
    // Application Constructor
    initCallbacks : function(onReceivedItem, onError){
        onReceivedItemCallback = onReceivedItem;
        onErrorCallback = onError;
    },
    service : {
        name : "",
        urn : "",
        init : function(name, urn, situationType){
            this.name = name;
            this.urn = urn;
            this.situationType = situationType;
            return this;
        }
    },
    onReceivedItem : function(itemJson, type){
        if(onReceivedItemCallback != null){
            onReceivedItemCallback(type);
        } else {
            alert("Received item type [" + type + "]");
        }
    },
    onError : function(message){
        if(onErrorCallback != null){
            onErrorCallback(message);
        } else {
            alert("Error in context: " + message);
        }
    },
    getServices: function(callback, errorCallback){
        cordova.exec(function(a) {
            var length = a.length;
            var SERVICES = new Array();
            for(var m=0; m < length; m++){
                var SERVICE = new context.service.init(a[m]["name"], a[m]["urn"], a[m]["situationType"]);
                SERVICES.push(SERVICE);
            }
            callback(SERVICES);
        }, function(e) {
            errorCallback(e);
        }, "Context", "getServicesList", []
        );
    },
    init: function(services, callback, errorCallback) {
        var servicesList = services;
        cordova.exec(function(a) {
            callback(a);
        }, function(e) {
            errorCallback(e);
        }, "Context", "initWithServicesList", [servicesList]
        );
    },
    stop: function(callback, errorCallback) {
        cordova.exec(function(a) {
            callback(a)
        }, function(e) {
            errorCallback(e);
        }, "Context", "stopServices", []
        );
    },
    checkStatus: function(callback, errorCallback) {
        cordova.exec(function(a) {
            callback(a)
        }, function(e) {
            errorCallback(e);
        }, "Context", "checkStatus", []
        );
    }
}
module.exports = context;});
