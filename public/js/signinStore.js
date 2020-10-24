
$(function() {

    $("#loginStoreForm").submit((e) => {
        e.preventDefault();
        $.post("api/store/login", {
            store_email: $("#email").val().toLowerCase(),
            password: $("#password").val().toLowerCase(),
        }, function (data, status) {
            window.localStorage.setItem("token", data.token);
            $(".card").slideUp();
                setTimeout(function(){
                    window.location.href = "/homeCompanies.html";
                }, 1000);
//            window.location.href = "/homeCompanies.html";
        });

    });
})