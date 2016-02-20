({
	createRecord : function(component,event,helper) {
        var appEvent = $A.get("e.c:MyTimesheetsCmpRouter");
        appEvent.setParams({
            "recordId": '',
            "pageToOpen": 'createRecord'
        });
        appEvent.fire();
    }
})