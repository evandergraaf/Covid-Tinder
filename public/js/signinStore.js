
$(function() {

    $("#loginStoreForm").submit((e) => {
        e.preventDefault();
        $.post("api/store/login", {
            store_email: $("#email").val().toLowerCase(),
            password: $("#password").val().toLowerCase(),
        }, function (data, status) {
            window.localStorage.setItem("token", data.token);
            window.location.href = "/homeCompanies.html";
        });

    });
})