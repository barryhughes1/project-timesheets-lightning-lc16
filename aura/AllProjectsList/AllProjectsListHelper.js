({
	populateProjectList : function(cmp) {
        var action = cmp.get("c.getProjects");
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                console.debug(response.getReturnValue().length);
                cmp.set("v.projects", response.getReturnValue());
            } else {
                console.debug(response.error[0].message);
            }
        });
	 	$A.enqueueAction(action);		
	}
})