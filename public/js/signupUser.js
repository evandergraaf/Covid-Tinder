
$(function() {

    $("#signUpForm").submit((e) => {
        e.preventDefault();
        $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+ $("#location").val() +"&key=AIzaSyAWd49rKgMR0RHaL9a38_tyQEEhXudKgrc",
                function(res, err){
                    var latitude = res.results[0]["geometry"].location.lat;
                    var longitude = res.results[0]["geometry"].location.lng;
                    var location =  latitude + ',' + longitude;

                    if ($("#password").val() === $("#valPass").val()) {
                        $.post("api/user/create", {
                            user_email: $("#email").val().toLowerCase(),
                            password: $("#valPass").val().toLowerCase(),
                            full_name: $("#fullName").val(),
                            set_location: location,
                            phone: $("#tlf").val(),
                            age: $("#age").val(),
                        }, function (data, status) {
                            $(".card").slideUp();
                            setTimeout(function(){
                                 window.location.href = "/logInUser.html";
                            }, 1000);
                        });
                    } else{
                        alert("Passwords don't match");
                    }
                });
    });
})