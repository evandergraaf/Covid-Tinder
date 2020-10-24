
$(function() {

    $("#loginUserForm").submit((e) => {
        e.preventDefault();
            $.post("api/user/login", {
                user_email: $("#email").val().toLowerCase(),
                password: $("#password").val().toLowerCase(),
            }, function (data, status) {
                console.log(data);
                console.log(data.token);
                $(".card").slideUp();
                setTimeout(function(){
                    window.location.href = "/homeUsers.html";
                }, 1000);
                window.localStorage.setItem("token", data.token);
                window.location.href = "/homeUsers.html";
            });

    });
})