const Const = {
    orgVariable: {
        module: "acuityscheduling1__module",
        activities: "acuityscheduling1__activities",
        salessignals: "acuityscheduling1__salessignals",
        privatecalendar: "acuityscheduling1__privatecalendar",
        timeformat: "acuityscheduling1__timeformat",
        phoneField: "acuityscheduling1__phonemobile",
        zKey: "acuityscheduling1__zkey",
        cDeal: "acuityscheduling1__createdeal"
    }
}
// Element IDS 
const LeadsOrContactsSelectId = "LeadsOrContacts";
const TasksOrEventsSelectId = "TasksOrEvents";
const NotificationsSelectId = "Notifications";
const PrivateCalendarSelectId = "PrivateCalendar";
const PhoneOrMobileSelectId = "PhoneOrMobile";

Utils = {};
/*
 * util methods
 */
Utils.showLoading = function () {
    $("#loadingDiv").show();
}
Utils.hideLoading = function () {
    $("#loadingDiv").hide();
}
Utils.successMsg = function (message) {
    $('.successMsg').text(message);
    $('.successMsg').slideDown(function () {
        $('.successMsg').delay(3000).slideUp();
    });
}

function loadSettings() {
    // Leads or Contacts
    ZOHO.CRM.API.getOrgVariable(Const.orgVariable.module).then(function (data) {
        if (data && data.Success) {
            moduleName = data.Success.Content;
            // $("#modules").val(moduleName);
            document.getElementById(LeadsOrContactsSelectId).value = moduleName; // Leads OR Contacts
        }
    });

    // Tasks or Meetings
    ZOHO.CRM.API.getOrgVariable(Const.orgVariable.activities).then(function (data) {
        if (data && data.Success) {
            activities = data.Success.Content;
            // $("#activities").val(activities);
            document.getElementById(TasksOrEventsSelectId).value = activities;
        }
    });

    // Notification On or Off
    ZOHO.CRM.API.getOrgVariable(Const.orgVariable.salessignals).then(function (data) {
        if (data && data.Success) {
            salessignals = data.Success.Content;
            if (salessignals == "true") {
                //    $("#salessignals").prop("checked",true);
                document.getElementById(NotificationsSelectId).value = "On";
            }
            if (salessignals == "false") {
                // $("#salessignals").prop("checked", false);
                document.getElementById(NotificationsSelectId).value = "Off";
            }
        }
    });

    // Private Calendar in Email On or Off 
    ZOHO.CRM.API.getOrgVariable(Const.orgVariable.privatecalendar).then(function (data) {
        if (data && data.Success) {
            privatecalendar = data.Success.Content;
            if (privatecalendar == "true") {
                // $("#privatecalendar").prop("checked", true);
                document.getElementById(PrivateCalendarSelectId).value = "On";
            }
            if (privatecalendar == "false") {
                // $("#privatecalendar").prop("checked", false);
                document.getElementById(PrivateCalendarSelectId).value = "Off";
            }
        }
    });
    ZOHO.CRM.API.getOrgVariable(Const.orgVariable.phoneField).then(function (data) {
        if (data && data.Success) {
            phoneField = data.Success.Content;
            // $("#phone").val(phoneField);
            document.getElementById(PhoneOrMobileSelectId).value = phoneField;
        }
    });
}

function handleModuleChange() {
    var moduleValue = document.getElementById(LeadsOrContactsSelectId).value;
    var moduleMap = {
        "apiname": Const.orgVariable.module,
        "value": moduleValue
    };
    ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", moduleMap).then(function (data) {
        console.log(data)
    })
}

function handleActivityChange() {
    var activityValue = document.getElementById(TasksOrEventsSelectId).value;
    var activityVariable = {
        "apiname": Const.orgVariable.activities,
        "value": activityValue
    };
    ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", activityVariable).then(function (data) {
        console.log(data)
    })
}


function handleContactUpdate() {
    var contactValue = document.getElementById(PhoneOrMobileSelectId).value;
    var fieldChosenVar = {
        "apiname": Const.orgVariable.phoneField,
        "value": contactValue
    };
    ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", fieldChosenVar).then(function (data) {
        console.log(data)
    })
}

function handleNotificationChange() {
    const notificationValue = document.getElementById(NotificationsSelectId).value;
    if (notificationValue == "On") {
        overwriteValue = true;
    }
    else {
        overwriteValue = false;
    }

    var salesSignal = {
        "apiname": Const.orgVariable.salessignals,
        "value": overwriteValue
    }
    ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", salesSignal).then(function (data) {
        console.log(data);
    });
}

function handlePrivateCalendarChange() {
    const privateCalendarValue = document.getElementById(PrivateCalendarSelectId).value;
    let oValue;
    if (privateCalendarValue == "On") {
        oValue = true;
    }
    else {
        oValue = false;
    }

    var privateCalendar = {
        "apiname": Const.orgVariable.privatecalendar,
        "value": oValue
    }
    ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", privateCalendar).then(function (data) {
        console.log(data);
    });
}





function fixIssues() {
    var url;
    var zKey;
    // ZOHO.CRM.API.getOrgVariable(Const.orgVariable.zKey).then(function (data) {
    //     if (data && data.Success) {
    //         zKey = data.Success.Content;
    //         console.log(zKey);
    //         url = "https://platform.zoho.com/crm/v2/functions/acuityscheduling1__deletehooks/actions/execute?auth_type=apikey&zapikey=" + zKey;
    //         request = {
    //             url: url
    //         }`
    //         ZOHO.CRM.HTTP.get(request).then(function (data) {
    //             console.log(data);
    //             Response = $.parseJSON(data);
    //             alert(Response.details.output + " Please reauthorize the plugin and continue");
    //         });

    //     }
    // });
    ZOHO.CRM.API.getOrgVariable(Const.orgVariable.zKey).then(function (data) {
        if (data && data.Success) {
            zKey = data.Success.Content;
            console.log(zKey);
    
                var func_name = "acuityscheduling1__deletehooks";
    
                var req_data = {
                "arguments": JSON.stringify({
                    "zapikey": zKey 
                })
            };
    
            ZOHO.CRM.FUNCTIONS.execute(func_name, req_data)
            .then(function(data){
                console.log(data);
    
                    Response = $.parseJSON(data);
                alert(Response.details.output + " Please reauthorize the plugin and continue");
            });
        }
    });
}



