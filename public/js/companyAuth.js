/** js/companyAuth.js
*Ean Vandergraaf, Laura Pareja,
*Carter Williams, Seth Workman
*KC Fed Code-A-Thon - Covid Project
*10/25/2020
*/
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
            }
    });
})