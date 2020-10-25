
$(function() {
    $.ajax({
        url: "api/store/auth",
        headers: {"x-auth": window.localStorage.getItem("token")},
        type: "GET",
        success: function() {console.log('auth') },
        error: function() {window.location.href = "/logInCompany.html";}
    });

    $.ajax({
        url: "api/store/current",
        headers: {"x-auth": window.localStorage.getItem("token")},
        type: "GET",
        success: function(data) {
            $("#company").html("Hi " + data[0].company + "!");
            console.log(data[0]); }
    });
})