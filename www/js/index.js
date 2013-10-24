/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var SERVICES = new Array();

/** Local storage */
const TAG_SERVICES_ENABLED = "services_enabled";

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

Storage.prototype.getEnabledServices = function(){
    var $storage = window.localStorage.getItem(TAG_SERVICES_ENABLED);
    if($storage == null || $storage == ""){
        $storage = new Array();
    } else {
        $storage = window.localStorage.getObj(TAG_SERVICES_ENABLED);
    }
    
    return $storage;
}

/** **/

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        */

       console.log('Received Event: ' + id);
       intel.initialize("EmtmRGxbOmccu33AH5D2qqU4Us3Kay3D", "WAUhKoNLx0EsMbIn", null, "http://54.245.105.150/oauth2callback2.html", function(userLogged){
           if(userLogged){ //Store session
        	   custom.setStatusMessage("Token and sesion data recovered successful!", false);
               $("#login_btn").find('span').text('Logout');
               $("#login_btn").attr('onclick','').unbind('click').on('click', function(){
                   custom.logout();
               });
               custom.setIsLogged(true);
           }
       });
       
       context.checkStatus(function(state){
    	   if(state){
    		   $("#start_button").css("background","gray");
               $("#stop_button").css("background","red");
    	   } else {
    		   $("#start_button").css("background","limegreen");
               $("#stop_button").css("background","gray");
    	   }
       }, function(error){});
       
       context.getServices(function(services){
           SERVICES = services;
       }, function(error){
    	   custom.setStatusMessage("Error obtaining availabilities services.", true);
       });
       
       context.initCallbacks(function(type){
           var $elements = $('.ui-li-count');
           $.each($elements, function(){
               var idElement = $(this).attr("id");
               if(idElement == type){
                    var counter = parseInt($(this).text()) + 1;
                    $(this).text(counter);
                    statesRegistry.incrementNumberState(idElement);
               }
           });
       }, function(error){
    	   custom.setStatusMessage("Error in context: " + error, true);
       });
    }
};