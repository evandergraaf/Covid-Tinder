
$(function() {

    $("#loginUserForm").submit((e) => {
        e.preventDefault();
            $.post("api/user/login", {
                user_email: $("#email").val().toLowerCase(),
                password: $("#password").val().toLowerCase(),
            }, function (data, status) {
                window.localStorage.setItem("token", data.token);
                window.location.href = "/homeUsers.html";
            });

    });
})