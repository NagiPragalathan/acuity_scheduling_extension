function initializeWidget()
{
	
	ZOHO.embeddedApp.init().then(function() { 
	
		ZOHO.CRM.API.getOrgVariable("acuityscheduling1.clientURL").then(function(data)
		{
			clientUrl = data.Success.Content;
			//alert(clientUrl);
			
			
		}).then(ZOHO.embeddedApp.on("PageLoad",function(response)
		{
			console.log("response");
			//console.log(JSON.stringify(response,null,2));
			f_name = response.data.First_Name;
			document.getElementById("fname").value = f_name;
			l_name = response.data.Last_Name;
			document.getElementById("lname").value = l_name;
			mobile = response.data.Mobile;
			document.getElementById("phone").value = mobile;
			email = response.data.Email;
			document.getElementById("emailid").value = email;
			document.getElementById("message").value = "Hi " + f_name + " ,I would like to setup an appointment with you. Click on the time that works for you to schedule the appointment. $availability";
		}));
		
		});
	}
	
	function submittocrm()
	{
	//alert(document.getElementById("message").value);
                   var func_name = "acuityscheduling1.sendEmail";
					var req_data ={
  						"arguments": JSON.stringify({
      					"fname" : document.getElementById("fname").value,
      					"lname" : document.getElementById("lname").value,
      					"email" : document.getElementById("emailid").value,
      					"title" : document.getElementById("subject").value,
      					"desc" : document.getElementById("message").value
  				})
			};
		ZOHO.CRM.FUNCTIONS.execute(func_name, req_data)
			.then(function(data){
    		console.log(data)
		});
	
}
document.onreadystatechange = initializeWidget;