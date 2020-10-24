
$(function() {
    $.ajax({
        url: "api/store/auth",
        headers: {"x-auth": window.localStorage.getItem("token")},
        type: "GET",
        success: function() {console.log('auth') },
        error: function() {window.location.href = "/logInCompany.html";}
    });
})