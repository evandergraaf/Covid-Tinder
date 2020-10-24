
$(function() {

    $("#signUpForm").submit((e) => {
        e.preventDefault();
        if ($("#password").val() === $("#valPass").val()) {
            $.post("api/user/create", {
                user_email: $("#email").val().toLowerCase(),
                password: $("#valPass").val().toLowerCase(),
                full_name: $("#fullName").val(),
                set_location: "0",
                phone: $("#tlf").val(),
                age: $("#age").val(),
            }, function (data, status) {
                console.log(data);
                console.log('test');
            });
        } else{
            alert("Passwords don't match");
        }

    });
})