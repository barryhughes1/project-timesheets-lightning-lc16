public class ProjectTimesheetFormController {

    @AuraEnabled
    public static Project_Timesheet__c getProjectTimesheet(String recordId) {
		System.debug('recordId: ' + recordId);
        if((recordId == '') || (recordId == null)) {            
			Consultant__c c = [SELECT Id,Name,User_Name__c FROM Consultant__c WHERE User_Name__c = :userinfo.getName()];            
            return new Project_Timesheet__c(
	            Consultant__c = c.Id
            );
        } else {
            return [SELECT Id,Name,Date_of_Work__c,Project_Name__c,
                    Project_Name_Text__c,P_Opportunity_Name__c,
                    Billable__c,Consultant_Name__c,Consultant__c,Customer__c,
                    Customer_Name__c,Duration__c,Project_Stage__c,
                    Notes__c,Description__c, Date_of_Work_Text__c 
                    FROM Project_Timesheet__c
                    WHERE Id = :recordId][0];            
        }
    } 
    
    @AuraEnabled
    public static Project_Timesheet__c saveProjectTimesheet(Project_Timesheet__c pt) {
        System.debug('saving');
        System.debug(pt.P_Opportunity_Name__c);
        if(pt.Project_Name__c == null) {
            System.debug('Need to get the Opportunity from the Project');
            Project__c proj = [SELECT Customer_Name__c, Opportunity_Name__c FROM Project__c WHERE ID = :pt.P_Opportunity_Name__c];
            pt.Project_Name__c = proj.Opportunity_Name__c;
            pt.Customer__c = proj.Customer_Name__c;
        }
        if(pt.Consultant_Name__c == null) {
	        Consultant__c c = [SELECT Id,Name,User_Name__c FROM Consultant__c WHERE id = :pt.Consultant__c];
            pt.Consultant_Name__c = c.User_Name__c;
        }
        upsert pt;
        return pt;
    }


    @AuraEnabled
    public static Project_Timesheet__c cloneProjectTimesheet(Project_Timesheet__c pt) {
        System.debug('cloning');
        System.debug(pt.P_Opportunity_Name__c);
        if(pt.Project_Name__c == null) {
            System.debug('Need to get the Opportunity from the Project');
            Project__c proj = [SELECT Customer_Name__c, Opportunity_Name__c FROM Project__c WHERE ID = :pt.P_Opportunity_Name__c];
            pt.Project_Name__c = proj.Opportunity_Name__c;
            pt.Customer__c = proj.Customer_Name__c;
        }
        if(pt.Consultant_Name__c == null) {
	        Consultant__c c = [SELECT Id,Name,User_Name__c FROM Consultant__c WHERE id = :pt.Consultant__c];
            pt.Consultant_Name__c = c.User_Name__c;
        }
		Project_Timesheet__c pt_c = pt.clone(false, true);
        insert pt_c;
        return pt_c;
    }
    
    @AuraEnabled
    public static void deleteProjectTimesheet(ID recordId) {
        Project_Timesheet__c pt = new Project_Timesheet__c(id= recordId);
		delete pt;        
    }    
    
    @AuraEnabled
    public static List<Consultant__c> getConsultants() {
        return [SELECT Id,Name,User_Name__c FROM Consultant__c];
    } 
    
    
    @AuraEnabled
    public static List<Project__c> getProjects() {
        return [SELECT Id,Name,CreatedDate,Opportunity_Name__c,Customer_Name__c,
                		Account_ID__c,Opportunity_Stage__c,Client_Name__c,
                		Time_Carried_Over_Hrs__c,Estimated_Effort_Hrs__c 
                FROM Project__c
               	WHERE Opportunity_Stage__c = 'Closed Won'
                ORDER BY CreatedDate DESC, NAME ASC
               ];        
    } 
    
    
    @AuraEnabled
    public static List<String> getDescriptionOptions() {    
    	// this function builds the list of SelectOptions for the Department field   
        List<String> options = new List<String>();
        // do describe here to get the Department__c field picklist values
        Schema.DescribeFieldResult deptDFR = Schema.sObjectType.Project_Timesheet__c.fields.Description__c;
        for (Schema.PickListEntry deptPickVal : deptDFR.getPicklistValues()){
        	// create a selectoption for each pickval
        	options.add(deptPickVal.getLabel());
        }
        return options;
    }

    @AuraEnabled
    public static List<String> getProjectStages() {    
    	// this function builds the list of SelectOptions for the Department field   
        List<String> options = new List<String>();
        // do describe here to get the Department__c field picklist values
        Schema.DescribeFieldResult deptDFR = Schema.sObjectType.Project_Timesheet__c.fields.Project_Stage__c;
        for (Schema.PickListEntry deptPickVal : deptDFR.getPicklistValues()){
        	// create a selectoption for each pickval
        	options.add(deptPickVal.getLabel());
        }
        return options;
    }
    
}