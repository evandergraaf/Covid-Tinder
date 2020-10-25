

$(function() {
    $.ajax({
        url: "api/user/auth",
        headers: {"x-auth": window.localStorage.getItem("token")},
        type: "GET",
        success: function() {console.log('auth') },
        error: function() {window.location.href = "/logInUser.html";}
    });

    $.ajax({
        url: "api/user/current",
        headers: {"x-auth": window.localStorage.getItem("token")},
        type: "GET",
        success: function(data) {console.log(data[0]) }
    });

})