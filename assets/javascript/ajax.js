$(document).ready(function () {
    console.log("ready")


    // function to display results after submit button is pressed
    $("#submit").on("click", function () {
        console.log("submit button working")

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


            // displays results from the USAJobs board to the page
            var results = response.SearchResult.SearchResultItems;

            // create a new div for each job result in the array with a unique id corresponding with the index of the item
            results.map(function (value, key) {
                // create new table row
                var newResult = $("<tr>");
                newResult.addClass("search-result");
                newResult.attr("id", "result-" + key);
                // add table data
                var newJobTitle = $("<td>").text(value.MatchedObjectDescriptor.PositionTitle);
                var newEmployer = $("<td>").text(value.MatchedObjectDescriptor.OrganizationName);
                var newJobLocation = $("<td>").text(value.MatchedObjectDescriptor.PositionLocationDisplay);
                var newJobDescription = $("<td>").addClass("overflow-auto").text(value.MatchedObjectDescriptor.UserArea.Details.JobSummary);
                // append table data to new row
                newResult.append(newJobTitle).append(newEmployer).append(newJobLocation).append(newJobDescription);
                // append new row to table body
                $(".job-info-1").append(newResult);

            });










            

            // RACHEL - THIS LINE GOES ON 63

        })


        //writing ajax functionality for the github jobs api

        var keyword = $("#keyword").val()
        var loc = $("#location").val()
        var queryURL = "https://jobs.github.com/positions.json?description=" + keyword + "&location=" + loc


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var resultsArr = response
            console.log(resultsArr);


//GitHub Jobs Code
    // create a new div for each job result in the array with a unique id corresponding with the index of the item
    resultsArr.map(function(value,key) {
      // create new table row
      var newResult = $("<tr>");
      newResult.addClass("search-result");
      newResult.attr("id","result-" + key);
      // add table data
      var newJobTitle = $("<td>").text(value.title);
      var newEmployer = $("<td>").text(value.company);
      var newJobLocation = $("<td>").text(value.location);
      var newJobDescription = $("<td>").addClass("stopText").text(value.description);
      // append table data to new row
      newResult.append(newJobTitle).append(newEmployer).append(newJobLocation).append(newJobDescription);
      // append new row to table body
      $(".job-info-2").append(newResult);
    // });

            //GitHub Jobs Code








































            //PHIL - THIS LINE GOES ON 122
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
        

        //Empties the input boxes after the submit button is clicked
        $("#keyword").val(" ")
        $("#location").val(" ")

    });


});





})
