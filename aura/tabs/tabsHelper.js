({
    init: function(component) {
        var body = component.get("v.body");
        var items = [];
        var tabCmp = null;
        for (var i = 0; i < body.length; i++) {
            tabCmp = body[i];
          	items.push(tabCmp);
        }
        component.set("v.items", items);
        component.set("v.body", []);
        this.update(component);
    },        
        
    update: function(component) {
        var tabsClass = component.get("v.tabsClass") || null;
        if (tabsClass) {
            component.set("v.gen_class", tabsClass);
            
        } else {
            
            var type = component.get("v.type") || null;
            var clas = component.get("v.class") || null;
            
            var gen_class = "slds-tabs";
            
            gen_class += type ? " slds-tabs--" + type : "";
            gen_class += clas ? " " + clas : "";
            
            component.set("v.gen_class", gen_class);
        }

        component.set("v.gen_nav_class", gen_class+"__nav");
        var items = component.get("v.items"); //[];
        var navItems = [];
       	var navItem = null;
        var tabCmp = null;
        var headerClass = "slds-tabs__item slds-text-heading--label ";
        var extraClass = null;
        var active = false;
        var activeSet = false; // Ensure only one tab is active, first one in wins!
        for (var i = 0; i < items.length; i++) {
            tabCmp = items[i];
            extraClass = tabCmp.get("v.tabClass");
            active = tabCmp.get("v.active");
                
            navItem = {
                title: tabCmp.get("v.title"),
                active: activeSet ? false : active,
                class: headerClass + (extraClass != null ? " " + extraClass : "")
            }
            
            activeSet = activeSet || active;
            
            navItems.push(navItem);
            //items.push(tabCmp);
        }
        if (!activeSet) {
            navItems[0].active = true;
            items[0].set("v.active", true);
        }
        component.set("v.nav_items", navItems);
    }
})