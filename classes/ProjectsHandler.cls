public class ProjectsHandler {

	@AuraEnabled
    public static List<Project__c> getProjects() {        

											

        List<Project__c> projects = [SELECT Id,Name,CreatedDate,Opportunity_Name__c,
                                                Customer_Name__c,Account_ID__c, Project_Date_Text__c,
                                                Opportunity_Stage__c,Client_Name__c,
                                                Time_Carried_Over_Hrs__c,Estimated_Effort_Hrs__c
                                            FROM Project__c  
                                     		WHERE Opportunity_Stage__c = 'Closed Won'
                                            ORDER BY CreatedDate DESC, Name ASC
                                                       LIMIT 10];

        return projects;
    }
}