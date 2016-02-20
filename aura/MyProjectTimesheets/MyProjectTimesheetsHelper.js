({
    showRoute: function(component,activeRoute) {
        var routes = component.find("routeContainer").get('v.body');
        for (var i=0; i<routes.length; i++) {
            if (activeRoute == routes[i].getLocalId()) {
                $A.util.removeClass(routes[i],"route--off");
            } else {
                $A.util.addClass(routes[i],"route--off");
            }
        }
        component.set('v.currentView',activeRoute);
    },
    createRecord : function(component) {
        $A.createComponent(
            "c:ProjectTimesheetForm",
            {
                "id": "",
                "editMode": "Edit",
                "processMode": "New"
            },
            function(cmp){
                //Add the new button to the body array
                if (component.isValid()) {                                       
                    var body = component.find("recordRoute").get("v.body"); 
                    body.push(cmp); 
                    component.find("recordRoute").set("v.body", body); 
                }
            }
        );
    },
    editRecord : function(component, id) {
        $A.createComponent(
            "c:ProjectTimesheetForm",
            {
                "id": id,
                "editMode": "Edit",
                "processMode": "Edit"
            },
            function(cmp){
                //Add the new button to the body array
                if (component.isValid()) {                                       
                    var body = component.find("recordRoute").get("v.body"); 
                    body.push(cmp); 
                    component.find("recordRoute").set("v.body", body); 
                }
            }
        );
    },
    viewRecord : function(component, id) {
        $A.createComponent(
            "c:ProjectTimesheetForm",
            {
                "id": id,
                "editMode": "Read",
                "processMode": ""
            },
            function(cmp){
                //Add the new button to the body array
                if (component.isValid()) {                                       
                    var body = component.find("recordRoute").get("v.body"); 
                    body.push(cmp); 
                    component.find("recordRoute").set("v.body", body); 
                }
            }
        );
    },
    cloneRecord : function(component, id) {
        $A.createComponent(
            "c:ProjectTimesheetForm",
            {
                "id": id,
                "editMode": "Edit",
                "processMode": "Clone"
            },
            function(cmp){
                //Add the new button to the body array
                if (component.isValid()) {                                       
                    var body = component.find("recordRoute").get("v.body"); 
                    body.push(cmp); 
                    component.find("recordRoute").set("v.body", body); 
                }
            }
        );
    },
    deleteRecord : function(component, id) {
        var action = component.get("c.deleteProjectTimesheet");
        action.setParams({
            recordId : id
        });
        
        action.setCallback(this, function(a) {
            if (a.getState() === "SUCCESS") {
                // record was deleted
                alert("The record has been deleted")
                console.log('deleted');
                var appEvent = $A.get("e.c:ProjectTimesheetRefresh");
                console.log("firing");
                appEvent.fire();               
            } else if (a.getState() === "ERROR") {
                console.log(a.getError());
                $A.log("Errors", a.getError());
            }
        });            
        $A.enqueueAction(action);
    }
})