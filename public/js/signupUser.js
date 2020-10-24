
$(function() {

    $("#signUpForm").submit((e) => {
        e.preventDefault();
        $.post("api/user/create", {
            user_email: $("#email").val(),
            password: $("#valPass").val(),
            full_name: $("#fullName").val(),
            set_location: "0",
            phone:$("#tlf").val(),
            age: $("#age").val(),
        }, function(data, status) {
        console.log(test);
        console.log('test');
    });

    });
})