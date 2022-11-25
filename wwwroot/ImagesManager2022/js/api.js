const apiBaseURL = "http://localhost:5000/api/images";
const baseUrl = "http://localhost:5000";

let userId = 0;
function HEAD(successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL,
        type: 'HEAD',
        contentType: 'text/plain',
        complete: request => { successCallBack(request.getResponseHeader('ETag')) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function GET_ID(id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + id,
        type: 'GET',
        success: data => { successCallBack(data); },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function GET_ALL(successCallBack, errorCallBack, queryString = null) {
    let url = apiBaseURL + (queryString ? queryString : "");
    $.ajax({
        url: url,
        type: 'GET',
        success: (data, status, xhr) => { successCallBack(data, xhr.getResponseHeader("ETag")) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function POST(data, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (data) => { successCallBack(data) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function PUT(bookmark, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + bookmark.Id,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(bookmark),
        success: () => { successCallBack() },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function DELETE(id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + id,
        type: 'DELETE',
        success: () => { successCallBack() },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}

function CREATE_USER(data, successCallBack, errorCallBack)
{
    $.ajax({
        url: baseUrl + "/accounts/register",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (data, status, xhr) => {
            userId = data.Id;  
            successCallBack(data, xhr.getResponseHeader("ETag")) 
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) } 
    });
}
function LOGIN_USER(data, successCallBack, errorCallBack)
{
    $.ajax({
        url: baseUrl + "/token",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (tokenInfo, status, xhr) => {
            sessionStorage.setItem("access_token",tokenInfo.Access_token)
            GET_USER(tokenInfo.UserId,successCallBack,errorCallBack); 
            successCallBack(tokenInfo, xhr.getResponseHeader("ETag"));
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) } 
    });
}

function VERIFY_USER(code, successCallBack, errorCallBack)
{
    $.ajax({
        url: baseUrl + "/accounts/verify?id=" + userId +"&code=" + code,
        type: 'GET',
        contentType: 'application/json',
        data: JSON.stringify(code),
        success: (data, status, xhr) => {  successCallBack(data, xhr.getResponseHeader("ETag")) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) } 
    });
}

function GET_USER(userId, successCallBack, errorCallBack)
{
    $.ajax({
        url: baseUrl + "/accounts/index/" + userId,
        type: 'GET',
        contentType: 'application/json',
        success: (data, status, xhr) => 
        {
            successCallBack(data, xhr.getResponseHeader("ETag"))
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) } 
    });
}