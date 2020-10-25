
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