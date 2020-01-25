$(document).ready(function () {
    console.log("ready")

    // ajax call for USA Jobs

    // var host = "data.usajobs.gov";
    // var userAgent = "rasipes@gmail.com";
    var authKey = "1+O9aAwfO+XgebPVfqXfSkKAL3bb7wv4QItq/LRvqlA=";
    var topic = $("#keyword").val();
    var place = $("#location").val();

    var queryURL = "https://data.usajobs.gov/api/search?Keyword=" + topic + "&Location=" + place;

    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            // "Host": host,
            // "User-Agent": userAgent,
            "Authorization-Key": authKey
        }
    }).then(function (response) {
        console.log(response);
    })


    //writing ajax functionality for the github jobs api
    var keyword = "javascript"
    var location = "phoenix"
    var queryURL = "https://jobs.github.com/positions.json?description=" + keyword + "&location=" + location

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response
        console.log(results)
    })
})

// function to display results after submit button is pressed

$("#submit").on("click", function(){
    //prevents page from refreshing screen
    event.preventDefault();
    console.log("search-button working");

})
