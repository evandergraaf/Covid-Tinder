

$(function() {
    console.log(window.localStorage.getItem("token"));
    $.ajax({
        url: "api/user/auth",
        headers: {"x-auth": window.localStorage.getItem("token")},
        type: "GET",
        success: function() {console.log('auth') },
        error: function() {window.location.href = "/logInUser.html";}
    });
})