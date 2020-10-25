// js/loginUser.js
/** JS for the user login page
*Ean Vandergraaf, Laura Pareja,
*Carter Williams, Seth Workman
*KC Fed Code-A-Thon - Covid Project
*10/25/2020
*/
$(function() {

    $("#loginUserForm").submit((e) => {
        e.preventDefault();
            $.post("api/user/login", {
                user_email: $("#email").val().toLowerCase(),
                password: $("#password").val().toLowerCase(),
            }, function (data, status) {
                $(".card").slideUp();
                setTimeout(function(){
                    window.location.href = "/homeUsers.html";
                }, 1000);
                window.localStorage.setItem("token", data.token);
            });

    });
})