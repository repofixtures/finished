var isLogged = false;

var notification = {
    message : function(message,error){
        
        if($("#status_message_div").css('display') == 'none'){
            $("#status_message_div").fadeIn( "slow" );   
        }
        
        if(error){
            $("#status_message").css('color', 'red');
        } else {
            $("#status_message").css('color', 'lime');
        }
        $("#status_message").text(message);
        
        var interval = window.setInterval(function(){
            intervalFinish()
        },4000);
        function intervalFinish(){
            $("#status_message_div").fadeOut( "slow" );
            window.clearInterval(interval);
        }
    }
};

var statesRegistry = {
    getNumberStates : function(type){
        var count = window.localStorage.getItem(type);
        if(count == null){
            return 0;
        }
        return count;
    },
    setNumberStates : function(type, value){
        window.localStorage.setItem(type, value);
    },
    incrementNumberState : function(type){
        var count = parseInt(this.getNumberStates(type)) + 1;
        this.setNumberStates(type, count);
    },
    clearHistoryStates : function(){
        context.getServices(function(services){
            for(var i=0; i < services.length; i++){
                window.localStorage.removeItem(services[i]["urn"]);
                if(("span[name='" + services[i]["urn"] + "']").length > 0){
                    $("span[name='" + services[i]["urn"] + "']").text('0');
                }
            }
        }, function(error){
            notification.message("Error clearing history states number: " + error, true);
        });
    }
}

var custom = {
    setIsLogged : function(a){
        isLogged = a;
    },
    login : function(){
        if(isLogged){
            notification.message('The user already is logged', true);
            return;
        }
        intel.login(function(a){
            notification.message("The user has logged in successfully!", false); 
            $("#login_btn").find('span').text('Logout');
            $("#login_btn").attr('onclick','').unbind('click').on('click', function(){
                custom.logout(); 
            });
            isLogged = true;
        }, function(error){
            notification.message("Error in login: " + error,true);
        });
    },
    logout : function(){
        if(!isLogged){
            notification.message("The user isn't logged yet.", true);
            return;
        }
        notification.message("Logout in process..", false);
        intel.logout(function(){
            notification.message("The user has logged off successfully", false);
            $("#login_btn").find('span').text('Login');
            $("#login_btn").attr('onclick','').unbind('click').on('click', function(){
                custom.login(); 
            });
            isLogged = false;
        }, function(error){
            notification.message("Error in logout: " + error, true);
        });
    },
    contextInit : function(){
        notification.message("Starting context...", false);
        context.init(window.localStorage.getEnabledServices(), function(a){
            $("#start_button").css("background","gray");
            $("#stop_button").css("background","red");
            notification.message("Context has been initialized successfully!", false);
        }, function(error){
            notification.message("Context has not been initialized. Error: " + error, true);
        });
    },
    contextStop : function(){
        context.stop(function(a){
            $("#start_button").css("background","limegreen");
            $("#stop_button").css("background","gray");
            notification.message("The context service has been stopped successfully!", false);
            statesRegistry.clearHistoryStates();
        }, function(error){
            notification.message("Error in stop context service: " + error, true);
        });
    },
    setStatusMessage : function(message, error){
        notification.message(message,error);
    }
};