({
	populateTimesheetList : function(component, page, pageSize) {
        page = page || 1;
        pageSize = pageSize || 8;
        var action = component.get("c.getMyTimesheets");
		action.setParams({
      		"searchKey": component.get("v.searchKey"),
            "pageNumber": page
    	});
    	action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                component.set("v.myTimesheets", result.projectTimesheets);
//                console.debug(result.projectTimesheets.length);
                component.set("v.page", result.page);
//                console.log('Page: ' + result.page);
                component.set("v.total", result.total);
//                console.log('total: ' + result.total);
                component.set("v.pages", Math.ceil(result.total/pageSize));
//                console.log('pages: ' + Math.ceil(result.total/pageSize));
                
                // ProjectTimesheetPaginatorRefreshEvent
                var appEvent = $A.get("e.c:ProjectTimesheetPaginatorRefreshEvent");
                console.log('=====================');
                console.log('Page: ' + result.page);
                console.log('total: ' + result.total);
                console.log('pages: ' + Math.ceil(result.total/pageSize));
                appEvent.setParams({
                    "page": result.page,
                    "total": result.total,
                    "pages": Math.ceil(result.total/pageSize)
                });
                console.log('=====================');
                appEvent.fire();               
                
            } else {
                console.debug(response.error[0].message);
            }
    	});
	 	$A.enqueueAction(action);		
	}
})