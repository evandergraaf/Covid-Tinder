$(function() {

console.log($("#address").html());
$.get("https://maps.googleapis.com/maps/api/geocode/json?address="+ $("#address").html() +"&key=AIzaSyAWd49rKgMR0RHaL9a38_tyQEEhXudKgrc",
    function(res, err){
        console.log(res);
        var latitude = res.results[0]["geometry"].location.lat;
        var longitude = res.results[0]["geometry"].location.lng;
        console.log(latitude);
        console.log(longitude);
        
    });

})