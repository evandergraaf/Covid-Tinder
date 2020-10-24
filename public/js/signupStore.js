
$(function() {

    $("#signUpFormStore").submit((e) => {
        e.preventDefault();
        if ($("#password").val() === $("#valPass").val()) {
            $.post("api/store/create", {
                store_email: $("#store_email").val().toLowerCase(),
                password: $("#valPass").val().toLowerCase(),
                company: $("#company").val(),
                location: "0",
                phone: $("#tlf").val(),
            }, function (data, status) {
                console.log(data);
                $(".card").slideUp();
                setTimeout(function(){
                    window.location.href = "/logInCompany.html";
                }, 1000);
            });
        } else{
            alert("Passwords don't match");
        }

    });
})