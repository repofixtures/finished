cordova.define("org.intel.intel", function(require, exports, module) {var clientId;
var secretId;
var redirectUrl;
var scopes;
var isCheckedStatus = false; //Check the status of the login. If the user has turn on the "store session" switch then the app must wait to receive the token.
	
var intel = {
    // Application Constructor
    initialize: function(clientIdParam, secretIdParam, scopesParam, redirectUrlParam, checkIsLogged) {
        clientId = clientIdParam;
        secretId = secretIdParam;
        scopes = scopesParam;
        redirectUrl = redirectUrlParam;
        isCheckedStatus = false;

        cordova.exec(function(a) {
                     isCheckedStatus = true;
                checkIsLogged(a);
            }, function(e) {
                     isCheckedStatus = true;
                alert("Error initializing credentials: " + e);
            }, "Intel", "init", [clientIdParam, secretIdParam, scopesParam, redirectUrlParam]
        );
    },
    login: function(callback, errorCallback) {
        if(isCheckedStatus == false){
        	alert("First of all, you need initialize this.");
        	return;
        }
        cordova.exec(function(a) {
            callback(a);
        },
        function(e) {
            errorCallback(e);
        }, "Intel", "login", []
        );
    },
    logout: function(callback, errorCallback) {
    	if(isCheckedStatus == false){
    		alert("First of all, you need initialize this.");
    		return;
        }
        cordova.exec(function(a) {
            callback(a);
        }, function(e) {
            errorCallback(e);
        }, "Intel", "logout", []
        );
    }
}
module.exports = intel;});
