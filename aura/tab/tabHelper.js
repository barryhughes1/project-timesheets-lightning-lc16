({
    init: function(component) {
        /*
        var lazyLoad = component.get("v.lazyLoad") || false;
        if (lazyLoad === true) {
            var body = component.get("v.body");
            component.set("v.delayed_body", body);
            component.set("v.body", []);
        }
        */
    },
    
    update: function(component) {
        var tabClass = component.get("v.tabClass") || null;
        if (tabClass) {
            component.set("v.gen_class", tabClass);
            
        } else {
            
            var active = component.get("v.active") || false;
            
            /*
            if (active === true) {
                var body = component.get("v.body");
                if (typeof body === "undefined" || body === null || body.length === 0) {
                    var delayedBody = component.get("v.delayed_body");
                    component.set("v.body", delayedBody);
                    component.set("v.delayed_body", []);
                }
            }
            */
            var type = component.get("v.") || null;
            var clas = component.get("v.class") || null;
            
            var gen_class = "slds-tabs__content";
            
            gen_class += active ? " slds-show" : " slds-hide";
            gen_class += clas ? " " + clas : "";
            
            component.set("v.gen_class", gen_class);
        }
    }
})