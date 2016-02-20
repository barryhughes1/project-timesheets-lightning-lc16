({
    viewRecord : function(component,event,helper) {
        helper.routerMethod(component, event, 'viewRecord');
    },
    editRecord : function(component,event,helper) {
        helper.routerMethod(component, event, 'editRecord');
    },
    cloneRecord : function(component,event,helper) {
        helper.routerMethod(component, event, 'cloneRecord');
    },
    deleteRecord : function(component,event,helper) {
        helper.routerMethod(component, event, 'deleteRecord');
    }
})