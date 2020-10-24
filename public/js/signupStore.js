
$(function() {

    $("#signUpFormStore").submit((e) => {
        e.preventDefault();
        if ($("#password").val() === $("#valPass").val()) {
            $.post("api/user/create", {
                store_email: $("#store_email").val().toLowerCase(),
                password: $("#valPass").val().toLowerCase(),
                company: $("#company").val(),
                location: "0",
                phone: $("#tlf").val(),
            }, function (data, status) {
                console.log(data);
            });
        } else{
            alert("Passwords don't match");
        }
        window.location.href = "/loginCompany.html";
    });
})