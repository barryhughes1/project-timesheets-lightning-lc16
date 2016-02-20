({
    handleMyTimesheetsCmpRouter : function(component, event, helper) {
       var pageToOpen = event.getParam('pageToOpen');
   		console.log(pageToOpen);
        switch (pageToOpen) {
            case "viewRecord":
	            console.log("Need to hide the list of My Timesheets");
                var id = event.getParam('recordId');
                console.log("Retrieve the id from the event: " + id);
	            console.log("Show the record in read mode");
		        helper.showRoute(component,"recordRoute");
                helper.viewRecord(component, id);
                break;
            case "editRecord":
	            console.log("Need to hide the list of My Timesheets");
                var id = event.getParam('recordId');
                console.log("Retrieve the id from the event: " + id);
	            console.log("Show the record in edit mode");
		        helper.showRoute(component,"recordRoute");
                helper.editRecord(component, id);
                break;
            case "createRecord":
	            console.log("Need to hide the list of My Timesheets");
                console.log("There will be no id");
	            console.log("Show the create record component");
		        helper.showRoute(component,"recordRoute");
                helper.createRecord(component);
                break;
            case "cloneRecord":
	            console.log("Need to hide the list of My Timesheets");
                var id = event.getParam('recordId');
                console.log("Retrieve the id from the event: " + id);
	            console.log("Show the clone record component - includes the record data but no id");
		        helper.showRoute(component,"recordRoute");
                helper.cloneRecord(component, id);
                break;
            case "deleteRecord":
	            console.log("Need to hide the list of My Timesheets");
                var id = event.getParam('recordId');
                console.log("Retrieve the id from the event: " + id);
	            console.log("Show the clone record component - includes the record data but no id");
		        var resp = confirm("You want to delete this record?");
                if(resp) {
	                helper.deleteRecord(component, id);                    
	                helper.showRoute(component,"myTimesheets");
                }
                break;
            case "refreshList":
                var formData = event.getParam('formData');
                console.log("Retrieve the formData from the event: ");
				console.log(formData);
                console.log('fire save controller function - callback destroys the current component.');
                console.log("Need to refresh the list of My Timesheets and show it");
	            console.log("Show the clone record component - includes the record data but no id");
                helper.showRoute(component,"myTimesheets");
                var appEvent = $A.get("e.c:ProjectTimesheetRefresh");
                console.log("firing");
                appEvent.fire();               
                break;
            default:
		        helper.showRoute(component,"myTimesheets");
                console.log("destroy current component - show the list component (change css class)");
        }
        
	}
})