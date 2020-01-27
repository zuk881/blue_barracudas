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
                // console.log(value);
                var newJobTitle = $("<td>").html("<a href='" + value.MatchedObjectDescriptor.ApplyURI[0] + "' target='_blank'>" + value.MatchedObjectDescriptor.PositionTitle + "</a>")


                var newEmployer = $("<td>").text(value.MatchedObjectDescriptor.OrganizationName);
                var newJobLocation = $("<td>").text(value.MatchedObjectDescriptor.PositionLocationDisplay);
                var newJobDescription = $("<td>").addClass("overflow-auto").html(value.MatchedObjectDescriptor.UserArea.Details.JobSummary.substring(0, 250) + "...<a href='#'data-toggle='modal' data-target='#exampleModalScrollable'> see more </a>");
                $(".modal-body").val(value.MatchedObjectDescriptor.UserArea.Details.JobSummary);
                $('#exampleModalScrollable .modal-body').html();
                //open the modal
                // $('#exampleModalScrollable').modal('show') 
                // append table data to new row
                newResult.append(newJobTitle).append(newEmployer).append(newJobLocation).append(newJobDescription);
                // append new row to table body
                $(".job-info-1").append(newResult);

            });


        })


        //writing ajax functionality for the github jobs api

        var keyword = $("#keyword").val()
        var loc = $("#location").val()
        var queryURL = "https://jobs.github.com/positions.json?description=" + keyword + "&location=" + loc


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var resultsArr = response;
            console.log(resultsArr);


            //GitHub Jobs Code
            // create a new div for each job result in the array with a unique id corresponding with the index of the item
            resultsArr.map(function (value, key) {
                // create new table row
                var newResult = $("<tr>");
                newResult.addClass("search-result");
                newResult.attr("id", "result-" + key);
                // add table data
                var newSaveButton = $("<td>").html("<button type='button' class='btn btn-primary btn-sm save-button' data-title>Save</button>")
                var newJobTitle = $("<td>").html("<a href='" + value.url + "' target='_blank'>" + value.title + "</a>");
                var newEmployer = $("<td>").text(value.company);
                var newJobLocation = $("<td>").text(value.location);
                var newJobDescription = $("<td>").addClass("overflow-auto").html(value.description.substring(0, 250) + "...<a href='#'data-toggle='modal' data-target='#exampleModalScrollable'> see more </a>");
                // append table data to new row
                newResult.append(newSaveButton).append(newJobTitle).append(newEmployer).append(newJobLocation).append(newJobDescription);
                // append new row to table body
                $(".job-info-2").append(newResult);
                // });


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


            //writing ajax for reed api
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
    //initialize the firebase database where we can save user saved jobs
    var firebaseConfig = {
        apiKey: "AIzaSyDLgO9rlM5PW8AhrIWk31hdSwHxaEHbyhA",
        authDomain: "blue-barracuda.firebaseapp.com",
        databaseURL: "https://blue-barracuda.firebaseio.com",
        projectId: "blue-barracuda",
        storageBucket: "blue-barracuda.appspot.com",
        messagingSenderId: "436435380595",
        appId: "1:436435380595:web:9989d968eb18cc60cd7d06"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();

    //write the functionality of the save buttons
    //_______________________________________________
    //document click function that will allow the user to click

    //on the dynamically generated save buttons from the api calls that display in the save
    //column of the table rows
    //when the user clicks the save button
    $(document).on("click", ".save-button", function (e) {
        //the object will be pushed to firebase on that signed in users path
        e.preventDefault();
        console.log("save")
        console.log($(this))
        database.ref().push({

        })
    })
    //the saved jobs will then be pulled from firebase to be displayed on the favorites html page



})
