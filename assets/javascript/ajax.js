$(document).ready(function(){ 
    console.log("ready")
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    




















$("#submit").on("click", function(){
    console.log("submit")
    //writing ajax functionality for the github jobs api
    var keyword = $("#keyword").val()
    var loc = $("#location").val()
    var queryURL = "https://jobs.github.com/positions.json?description="+keyword+"&location="+loc

    $.ajax ({
        url: queryURL,
        method:"GET"
    }).then(function(response){
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