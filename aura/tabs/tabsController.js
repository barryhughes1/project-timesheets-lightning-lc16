({
    init: function(component, event, helper) {
        helper.init(component);
    },
    
    update: function(component, event, helper) {
        helper.update(component);
    },
    
    doAction: function(component, event, helper) {
        console.warn("doAction: ", component, event, helper);
        console.warn("params: ", event.getParams());
    },
    
    selectTab: function(component, event, helper) {
        var tabindex = event.target.getAttribute("tabindex");
        tabindex = parseInt(tabindex);
        var items = component.get("v.items");
        var item = items[tabindex];
        for (var i = 0; i < items.length; i++) {
            if (i === tabindex) {
                items[i].set("v.active", true);
            } else {
                items[i].set("v.active", false);
            }
        }
       	helper.update(component);
    }
})