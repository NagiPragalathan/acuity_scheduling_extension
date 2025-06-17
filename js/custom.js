var zCrmIds;
var zCrmModule;

function getFieldValueData(obj) {
	zCrmIds = obj.EntityId;
	zCrmModule = obj.Entity;

}


function loadPage() {
	ZOHO.CRM.API.getOrgVariable("acuityscheduling1__clientURL").then(function (data) {
		if (data && data.Success) {
			clientUrl = data.Success.Content;

			ZOHO.CRM.API.getOrgVariable("acuityscheduling1__phonemobile").then(function (data) {
				if (data && data.Success) {
					phoneField = data.Success.Content;
				}
			});
			//console.log(clientUrl);

			$.each(zCrmIds, function (index, value) {
				if (value) {

					ZOHO.CRM.API.getRecord({
						Entity: zCrmModule,
						RecordID: value
					})
						.then(function (response) {
							$.each(response.data, function (key, rvalue) {
								acuityUrl = clientUrl;
								f_name = rvalue.First_Name;
								if (f_name) {
									acuityUrl = acuityUrl + "?&firstName=" + f_name;
								}
								else {
									acuityUrl = acuityUrl + "?&firstName=" + " "
								}
								l_name = rvalue.Last_Name;
								acuityUrl = acuityUrl + "&lastName=" + l_name;
								if (phoneField == "Phone") {
									mobile = rvalue.Phone;
								}
								else if (phoneField == "Mobile") {
									mobile = rvalue.Mobile;
								}
								else if (phoneField == "Home_Phone") {
									mobile = rvalue.Home_Phone;
								}

								if (mobile) {
									acuityUrl = acuityUrl + "&phone=" + mobile;
								}
								else {
									acuityUrl = acuityUrl + "&phone=" + "000000000";
								}
								email = rvalue.Email;
								if (email) {
									acuityUrl = acuityUrl + "&email=" + email;
								}
								else {
									acuityUrl = acuityUrl + "&email=" + "noemail";
								}
								window.open(acuityUrl, '_self');

							});
						});
				}
			});
		}
		else {
			$("#error").html('Client Schedule URL not found ! Please add it under the Plugin configuration --> Extension Settings');
		}

	});
}	