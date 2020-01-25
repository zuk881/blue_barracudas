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

$("#submit").on("click", function(){
    console.log("submit")
    //writing ajax functionality for the github jobs api

    var keyword = $("#keyword").val()
    var loc = $("#location").val()
    var queryURL = "https://jobs.github.com/positions.json?description="+keyword+"&location="+loc


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response
        console.log(results);
    })
})

// //ajax for indeed api
// var keywordIndeed = $("#keyword").val()
// var loc= $("#location").val()
// var settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://indeed-indeed.p.rapidapi.com/apigetjobs?v=2&format=json",
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "indeed-indeed.p.rapidapi.com",
// 		"x-rapidapi-key": "6a24900b4dmsh49b37a3833d9488p16a5cfjsnf50ec338300e"
// 	}
// }

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });




     //writing ajax for upwork api
    // var keywordReed = "web"
    // var locationReed = "london"
    // var queryURLreed = "https://www.reed.co.uk/api/search?keywords="+keywordReed+"&locationName="+locationReed



    // $.ajax ({
    //     url: queryURLreed,
    //     method: "GET"
    // }).then(function(response){
    //     var results = response
    //     console.log(results)
    // })
})


// function to display results after submit button is pressed

$("#submit").on("click", function(){
    //prevents page from refreshing screen
    event.preventDefault();
    console.log("search-button working");

})

