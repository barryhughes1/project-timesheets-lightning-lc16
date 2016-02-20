({
    doInit: function(component, event, helper) {

        console.log('loadTimesheet');
        var action = component.get("c.getProjectTimesheet");
        action.setParams({
            recordId : component.get("v.id")
        });
        
        action.setCallback(this, function(a) {
            if (a.getState() === "SUCCESS") {                
                component.set("v.project_timesheet", a.getReturnValue());
                if(component.get("v.editMode") == 'Edit') {
                    helper.callServer(component,"c.getConsultants",function(response){
                        var opts = [];
                        opts.push({
                            label : "-- Select --",
                            value: ""
                        });                        
                        for (var i=0; i<response.length; i++) {
                            opts.push({
                                label : response[i].User_Name__c,
                                value: response[i].Id
                            });
                        }
                        component.find("ConsultantName").set("v.options", opts);
                    });                
                    
                    
                    // Populate Descriptions field
                    helper.callServer(component,"c.getDescriptionOptions",function(response){
                        var opts = [];
                        opts.push({
                            label : "-- Select --",
                            value: ""
                        });
                        for (var i=0; i<response.length; i++) {
                            opts.push({
                                label : response[i],
                                value: response[i]
                            });
                        }
                        component.find("DescriptionOptions").set("v.options", opts);
                    });
                    
                    
                    // Populate Projects
                    helper.callServer(component,"c.getProjects",function(response){
                        var opts = [];
                        opts.push({
                            label : "-- Select --",
                            value: ""
                        });                        
                        for (var i=0; i<response.length; i++) {
                            opts.push({
                                label : response[i].Name,
                                value: response[i].Id
                            });
                        }
                        component.find("ProjectName").set("v.options", opts);
                    });
                    
                    
                    
                    // Populate Project Stages field
                    // getProjectStages
                    helper.callServer(component,"c.getProjectStages",function(response){
                        var opts = [];
                        opts.push({
                            label : "-- Select --",
                            value: ""
                        });                        
                        for (var i=0; i<response.length; i++) {
                            opts.push({
                                label : response[i],
                                value: response[i]
                            });
                        }
                        component.find("ProjectStages").set("v.options", opts);
                    });
                    
                }
                
            } else if (a.getState() === "ERROR") {
                $A.log("Errors", a.getError());
            }
        });
        
        $A.enqueueAction(action);
        
    },
    TimesheetSubmit : function(component, event, helper) {
        helper.saveTimesheet(component);
    },
    cancelButton : function(component, event, helper) {
        console.log("cancelButton");
        var appEvent = $A.get("e.c:MyTimesheetsCmpRouter");
        console.log("firing");
        appEvent.fire();      	  
        component.destroy();
    },
    editTimesheet : function(component, event, helper) {
        console.log("editButton");
        var appEvent = $A.get("e.c:MyTimesheetsCmpRouter");
        console.log("firing");
        appEvent.setParams({
            recordId : component.get("v.id"),
            pageToOpen: "editRecord"
        });
        appEvent.fire();      	  
        component.destroy();
    },
    deleteTimesheet : function(component, event, helper) {
        console.log("deleteButton");
        var appEvent = $A.get("e.c:MyTimesheetsCmpRouter");
        console.log("firing");
        appEvent.setParams({
            recordId : component.get("v.id"),
            pageToOpen: "deleteRecord"
        });
        appEvent.fire();      	  
        component.destroy();
    },    
    cloneTimesheet : function(component, event, helper) {
        console.log("cloneButton");
        var appEvent = $A.get("e.c:MyTimesheetsCmpRouter");
        console.log("firing");
        appEvent.setParams({
            recordId : component.get("v.id"),
            pageToOpen: "cloneRecord"
        });
        appEvent.fire();      	  
        component.destroy();
    },    
    defaultCloseAction : function(component, event, helper) {
        component.destroy();
    }
})