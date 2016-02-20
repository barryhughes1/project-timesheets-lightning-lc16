({
    saveTimesheet : function(component) {
        var action = component.get("c.saveProjectTimesheet");
		if(component.get("v.processMode") == "Clone") {
        	action = component.get("c.cloneProjectTimesheet");
		}
        action.setParams({
            pt : component.get("v.project_timesheet")
        });
		console.log(component.get("v.project_timesheet"));        
        
        action.setCallback(this, function(a) {
            if (a.getState() === "SUCCESS") {
                // record was saved
                console.log('saved');
                var appEvent = $A.get("e.c:MyTimesheetsCmpRouter");
                console.log("firing");
                appEvent.setParams({
                    pageToOpen: "refreshList"
                });
                appEvent.fire();      	  
                component.destroy();
                //                component.set("v.contact", a.getReturnValue());
            } else if (a.getState() === "ERROR") {
                console.log(a.getError());
                $A.log("Errors", a.getError());
            }
        });
        
        $A.enqueueAction(action);
    },
    callServer : function(component,method,callback,params,cacheable) {
        var action = component.get(method);
        if (params) {
            console.log("helper params: " + params);
            action.setParams(params);
        }
        if (cacheable) {
            action.setStorable();
        }
        action.setCallback(this,function(response) {
            var state = response.getState();
            if (state === "SUCCESS") { 
                console.log("SUCCESS");
                // pass returned value to callback function
                callback.call(this,response.getReturnValue());   
            } else if (state === "ERROR") {
                console.log("Failure");
                // generic error handler
                var errors = response.getError();
                if (errors) {
                    $A.logf("Errors", errors);
                    if (errors[0] && errors[0].message) {
                        $A.error("Error message: " + errors[0].message);
                    }
                } else {
                    $A.error("Unknown error");
                }
            }
        });
        
        $A.enqueueAction(action);
    }
})