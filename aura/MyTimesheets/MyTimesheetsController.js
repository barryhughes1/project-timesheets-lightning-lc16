({
	doInit: function(cmp,event,helper){
        helper.populateTimesheetList(cmp);
	},
	refreshList: function(cmp,event,helper){
        helper.populateTimesheetList(cmp);
    },
    searchKeyChange: function(component, event, helper) {
		var page = component.get("v.page") || 1;
        component.set ("v.searchKey", event.getParam("searchKey"));
        console.log('searchKeyChange');
        helper.populateTimesheetList(component, page);
	},
	pageChange: function(component, event, helper) {
		var page = component.get("v.page") || 1;
        var direction = event.getParam("direction");
        page = direction === "previous" ? (page - 1) : (page + 1);
        helper.populateTimesheetList(component, page);
    }
})