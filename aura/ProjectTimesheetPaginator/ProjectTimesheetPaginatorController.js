({
	previousPage : function(component, event, helper) {
        var myEvent = $A.get("e.c:ProjectTimesheetPageChange");
        myEvent.setParams({ "direction": "previous"});
        myEvent.fire();
	},
	nextPage : function(component, event, helper) {
        var myEvent = $A.get("e.c:ProjectTimesheetPageChange");
        myEvent.setParams({ "direction": "next"});
        myEvent.fire();
	},
    refreshPaginator : function(component, event, helper) {
        console.log('refreshPaginator Called');
		component.set("v.page", event.getParam('page'));
        console.log('Page: ' + event.getParam('page'));
        component.set("v.total", event.getParam('total'));
        console.log('total: ' + event.getParam('total'));
        component.set("v.pages", event.getParam('pages'));
        console.log('pages: ' + event.getParam('pages'));
	}
})