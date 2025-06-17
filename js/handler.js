const Const = {
    orgVariable: {
        module: "acuityscheduling1__module",
        activities: "acuityscheduling1__activities",
        salessignals: "acuityscheduling1__salessignals",
        privatecalendar:"acuityscheduling1__privatecalendar",
        timeformat:"acuityscheduling1__timeformat",
        phoneField:"acuityscheduling1__phonemobile",
        zKey:"acuityscheduling1__zkey",
        cDeal:"acuityscheduling1__createdeal"
    }
}

Utils = {};
/*
 * util methods
 */
Utils.showLoading = function() {
    $("#loadingDiv").show();
}
Utils.hideLoading = function() {
    $("#loadingDiv").hide();
}
Utils.successMsg = function(message) {
    $('.successMsg').text(message);
    $('.successMsg').slideDown(function() {
        $('.successMsg').delay(3000).slideUp();
    });
}

function loadSettings() {
    ZOHO.CRM.API.getOrgVariable(Const.orgVariable.module).then(function(data) {
        if (data && data.Success) {
            moduleName = data.Success.Content;
            $("#modules").val(moduleName);
        }
    });

    ZOHO.CRM.API.getOrgVariable(Const.orgVariable.activities).then(function(data) {
        if (data && data.Success) {
            activities = data.Success.Content;
            $("#activities").val(activities);
        }
    });
    ZOHO.CRM.API.getOrgVariable(Const.orgVariable.salessignals).then(function(data) {
        if (data && data.Success) {
            salessignals = data.Success.Content;
            if(salessignals == "true")
            {
               $("#salessignals").prop("checked",true);
            }
            if(salessignals == "false")
            {
                $("#salessignals").prop("checked",false);
            }
        }
    });
    ZOHO.CRM.API.getOrgVariable(Const.orgVariable.privatecalendar).then(function(data) {
        if (data && data.Success) {
            privatecalendar = data.Success.Content;
            if(privatecalendar == "true")
            {
               $("#privatecalendar").prop("checked",true);
            }
            if(privatecalendar == "false")
            {
                $("#privatecalendar").prop("checked",false);
            }
        }
    });
    ZOHO.CRM.API.getOrgVariable(Const.orgVariable.timeformat).then(function(data) {
        if (data && data.Success) {
            timeformat = data.Success.Content;
            if(timeformat == "true")
            {
               $("#timeformat").prop("checked",true);
            }
            if(timeformat == "false")
            {
                $("#timeformat").prop("checked",false);
            }
        }
    });
    ZOHO.CRM.API.getOrgVariable(Const.orgVariable.cDeal).then(function(data) {
        if (data && data.Success) {
            cDeal = data.Success.Content;
            if(cDeal == "true")
            {
               $("#createdeal").prop("checked",true);
            }
            if(cDeal == "false")
            {
                $("#createdeal").prop("checked",false);
            }
        }
    });
    ZOHO.CRM.API.getOrgVariable(Const.orgVariable.phoneField).then(function(data) {
        if (data && data.Success) {
            phoneField = data.Success.Content;
            $("#phone").val(phoneField);
        }
    });
}

function createdeal()
{
    if ($('#createdeal').is(":checked"))
    {
        overwriteValue = true;
    }
    else
    {
        overwriteValue = false;
    }
    
    var createDeal = {
         "apiname": Const.orgVariable.cDeal,
        "value": overwriteValue
    }
        ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", createDeal).then(function(data) {
        console.log(data);
 });

}


function salessignal()
{
    if ($('#salessignals').is(":checked"))
    {
        overwriteValue = true;
    }
    else
    {
        overwriteValue = false;
    }
    
    var salesSignal = {
         "apiname": Const.orgVariable.salessignals,
        "value": overwriteValue
    }
        ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", salesSignal).then(function(data) {
        console.log(data);
 });
}

function privateCalendar()
{
    if ($('#privatecalendar').is(":checked"))
    {
        oValue = true;
    }
    else
    {
        oValue = false;
    }
    
    var privateCalendar = {
         "apiname": Const.orgVariable.privatecalendar,
        "value": oValue
    }
        ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", privateCalendar).then(function(data) {
        console.log(data);
 });
}

function timeFormat()
{
    if ($('#timeformat').is(":checked"))
    {
        oValue = true;
    }
    else
    {
        oValue = false;
    }
    
    var timeFormat = {
         "apiname": Const.orgVariable.timeformat,
        "value": oValue
    }
        ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", timeFormat).then(function(data) {
        console.log(data);
 });
}



function clientModule() {
    var SModule = $("#modules option:selected").text();
    var moduleMap = {
        "apiname": Const.orgVariable.module,
        "value": SModule
    };
    ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", moduleMap).then(function(data) {
        console.log(data)
    })
}

function appointModule() {
    var SActivity = $("#activities option:selected").text();
    var activityVariable = {
        "apiname": Const.orgVariable.activities,
        "value": SActivity
    };
    ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", activityVariable).then(function(data) {
        console.log(data)
    })
}

function updatePhone() {
    var fieldChosen = $("#phone option:selected").text();
    var fieldChosenVar = {
        "apiname": Const.orgVariable.phoneField,
        "value": fieldChosen
    };
    ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", fieldChosenVar).then(function(data) {
        console.log(data)
    })
}

function fixIssues() {
    var url;
    var zKey;
    ZOHO.CRM.API.getOrgVariable(Const.orgVariable.zKey).then(function(data) {
    if(data && data.Success)
    {
        zKey = data.Success.Content;
        console.log(zKey);
        url = "https://platform.zoho.com/crm/v2/functions/acuityscheduling1__deletehooks/actions/execute?auth_type=apikey&zapikey="+zKey;
        request = {
                        url: url
                    }
        ZOHO.CRM.HTTP.get(request).then(function(data) {
        console.log(data);
        Response = $.parseJSON(data);
        alert(Response.details.output + " Please reauthorize the plugin and continue");
    });

    }
});
}



