({
	routerMethod : function(component, event, pageToOpen) {
        var appEvent = $A.get("e.c:MyTimesheetsCmpRouter");
        var id = component.find("timesheetId").get("v.value");
/*
        var element = event.srcElement;
        while(element.parentNode) {
            if(element.nodeName == "TR") {
                id = element.id;
                break;
            }
            element = element.parentNode;
        }
*/
        if(id == null) { return; }
        appEvent.setParams({
            "recordId": id,
            "pageToOpen": pageToOpen
        });
        appEvent.fire();		
	}
})