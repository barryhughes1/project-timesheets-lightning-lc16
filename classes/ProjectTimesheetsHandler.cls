public class ProjectTimesheetsHandler {

    @AuraEnabled
    public static List<Project_Timesheet__c> getMyTimesheets_OLD() {        
        List<Project_Timesheet__c> projectsTimesheet = [SELECT Id,Name,Date_of_Work__c,Project_Name__c,
                                                        Project_Name_Text__c,P_Opportunity_Name__c,
                                                        Billable__c,Consultant_Name__c,Customer__c,
                                                        Customer_Name__c,Duration__c,Project_Stage__c,
                                                        Notes__c,Description__c, Date_of_Work_Text__c 
                                                        FROM Project_Timesheet__c
                                                        WHERE Consultant_Name__c = :userinfo.getName()
                                                       ORDER BY Date_of_Work__c DESC, Customer_Name__c ASC
                                                       LIMIT 5];

        return projectsTimesheet;
    }

    @AuraEnabled
    public static ProjectTimesheetPagedResult getMyTimesheets(String searchKey, Decimal pageNumber) {        
        System.debug('searchKey: ' + searchKey);
        System.debug('pageNumber: ' + pageNumber);
		Integer pageSize = 8;
        System.debug('pageSize: ' + pageSize);
        String key = '%' + searchKey + '%';
        Integer offset = ((Integer)pageNumber - 1) * pageSize;
        System.debug('pageSize: ' + pageSize);
        
        ProjectTimesheetPagedResult p =  new ProjectTimesheetPagedResult();
        p.pageSize = pageSize;
        p.page = (Integer) pageNumber;
        p.total = [SELECT count() FROM Project_Timesheet__c
					WHERE Consultant_Name__c = :userinfo.getName()];
        p.projectTimesheets = [SELECT Id,Name,Date_of_Work__c,Project_Name__c,
									Project_Name_Text__c,P_Opportunity_Name__c,
                                    Billable__c,Consultant_Name__c,Customer__c,
                                    Customer_Name__c,Duration__c,Project_Stage__c,
                                    Notes__c,Description__c, Date_of_Work_Text__c 
                               FROM Project_Timesheet__c
                               WHERE Consultant_Name__c = :userinfo.getName()
		                       AND (Customer_Name__c LIKE :key OR Project_Name_Text__c LIKE :key)
                               ORDER BY Date_of_Work__c DESC, Customer_Name__c ASC
                               LIMIT 8 OFFSET :offset];
        System.debug(p);
        return p;        
    }
    
}