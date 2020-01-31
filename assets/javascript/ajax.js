$(document).ready(function () {
    console.log("ready")

    // function to display results after submit button is pressed
    $("#submit").on("click", function (e) {
        e.preventDefault();

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

                // create new button
                var saveButton = $("<a>").addClass("btn-floating btn-large waves-effect waves-light blue save-button").html('<i class="material-icons">save</i></a></button>')
                // add text to button
                // saveButton.text("Save")
                //add bootstrap to button

                // add value to button 
                saveButton.attr("data-url", value.MatchedObjectDescriptor.ApplyURI[0])
                saveButton.attr("data-title", value.MatchedObjectDescriptor.PositionTitle)
                saveButton.attr("data-company", value.MatchedObjectDescriptor.OrganizationName)
                saveButton.attr("data-loc", value.MatchedObjectDescriptor.PositionLocationDisplay)

                // create table cell
                var newSaveButton = $("<td>");
                // append button to the cell
                newSaveButton.append(saveButton);

                // add table data
                // console.log(value);
                var newJobTitle = $("<td>").html("<a href='" + value.MatchedObjectDescriptor.ApplyURI[0] + "' target='_blank'>" + value.MatchedObjectDescriptor.PositionTitle + "</a>")

                var newEmployer = $("<td>").text(value.MatchedObjectDescriptor.OrganizationName);
                var newJobLocation = $("<td>").text(value.MatchedObjectDescriptor.PositionLocationDisplay);

                var newJobDescription = $("<td>").addClass("overflow-auto").html(value.MatchedObjectDescriptor.UserArea.Details.JobSummary.substring(0, 250) + "...<a  href='#modal-" + key + "' class='see-more modal-trigger modal-close'> see more </a>");

                var newJobDescription = $("<td>").addClass("overflow-auto").html(value.MatchedObjectDescriptor.UserArea.Details.JobSummary.substring(0, 250) + "...<a  href='#modal1' class='see-more modal-trigger modal-close'> see more </a>");

                // $(".modal-body").val(value.MatchedObjectDescriptor.UserArea.Details.JobSummary);
                $('.modal-body').append($("<span class='description-text' id='modal-" + key + "'>").html(value.MatchedObjectDescriptor.UserArea.Details.JobSummary));
                // $(".description-text").hide();
                $(".see-more").on("click", function (e) {
                    e.preventDefault();

                    console.log("click working");
                    $(".modal-trigger").modal();

                    // $(".description-text").hide();
                    $("#description-" + key + "").show().val();

                });

                // $('#exampleModalScrollable').modal('show') 
                // append table data to new row
                newResult.append(newSaveButton).append(newJobTitle).append(newEmployer).append(newJobLocation).append(newJobDescription);
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
                // here i make a var called save button and create an html button using jquery
                var saveButton = $("<a>").addClass("btn-floating btn-large waves-effect waves-light blue save-button").html('<i class="material-icons">save</i></a></button>')

               




                //here I add the attributes for the values that I will need to push to the database in the click function
                saveButton.attr("data-url", value.url)
                saveButton.attr("data-title", value.title)
                saveButton.attr("data-company", value.company)
                saveButton.attr("data-loc", value.location)
                

                //now I make another var newsavebutton which creates the data cell 
                var newSaveButton = $("<td>")
                //that I append the actual button to
                newSaveButton.append(saveButton)
                //these are the variables that we create to hold the values that the ajax query returns to us
                var newJobTitle = $("<td>").html("<a href='" + value.url + "' target='_blank'>" + value.title + "</a>");
                var newEmployer = $("<td>").text(value.company);
                var newJobLocation = $("<td>").text(value.location);
                var newJobDescription = $("<td>").html(value.description.substring(0, 250) + "...<a href='#'data-toggle='modal' data-target='#exampleModalScrollable'> see more </a>");
                $(".modal-body").val(value.description);
                $('#exampleModalScrollable .modal-body').append($("<span class='description-text' id='description-" + key + "'>").html(value.description));
                $(".description-text").hide();
                $(document).on("click", ".see-more", function () {
                    console.log(value.description)
                    // $(".description-text").hide();
                    $("#description-" + key + "").show().val();
                })
                // append table data to new row
                newResult.append(newSaveButton).append(newJobTitle).append(newEmployer).append(newJobLocation).append(newJobDescription);
                // append new row to the appropriate table body
                $(".job-info-2").append(newResult);
                // });


            })
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
    var rootRef = database.ref();
    var userId;
    var autoId;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            console.log(user)
            userId = firebase.auth().currentUser.uid;
        } else {
            console.log("invalid")
            // No user is signed in.
        }
    });




    $("#logout").on("click", function () {
        firebase.auth().signOut()
        location.href = "auth.html"

    })


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
        // var savedJob = {
        //     title: $(this).attr("data-title"),
        //     location: $(this).attr("data-loc"),
        //     company: $(this).attr("data-company"),
        //     url: $(this).attr("data-url"),
        // savebutton: $(this)

        userId = firebase.auth().currentUser.uid;
        var autoId = rootRef.push().key
        //these are the attributes that were created when the button was made.
        rootRef.child(autoId).set({
            title: $(this).attr("data-title"),
            location: $(this).attr("data-loc"),
            company: $(this).attr("data-company"),
            url: $(this).attr("data-url"),
            // description: $(this).attr("data-description"),
            userid: userId,
            autoid: autoId
            // savebutton: $(this)
        }).then(console.log(autoId))
    })
    //the saved jobs will then be pulled from firebase to be displayed on the favorites html page
    //use the child added function to take the values from the db
    // var savedRef = database.ref('users')
    
    rootRef.on("child_added", function (snapshot) {
        console.log(snapshot.val());
        console.log("in snapshot")
        console.log(snapshot.val().autoid)



        if (snapshot.val().userid === userId) {
            //and store them in new variables            
            var savedTitle = snapshot.val().title
            var savedAutoId = snapshot.val().autoi
            var savedLoc = snapshot.val().location
            console.log(savedLoc)
            var savedCompany = snapshot.val().company
            console.log(savedCompany)
            var savedURL = snapshot.val().url
            var eraseButton = $("<a>").addClass("btn-floating btn-large waves-effect waves-light red erase-button").html('<i class="material-icons">delete</i></a></button>')
            eraseButton.attr("data-title", snapshot.val().title)
            eraseButton.attr("data-company", snapshot.val().company)
            eraseButton.attr("data-loc", snapshot.val().location)
            eraseButton.attr("data-url", snapshot.val().url)
            eraseButton.attr("data-id", savedAutoId)
            eraseButton.attr("data-userid", snapshot.val().userid)
            var appliedButton = $("<a target='_blank'>").addClass("btn-floating btn-large waves-effect waves-light green apply-button").html('<i class="material-icons">local_bar</i></a></button>')
            appliedButton.attr("href", snapshot.val().url)

            var newRow = $("<tr>").append(
                $("<td>").html(eraseButton),
                $("<td>").html(appliedButton),
                $("<td>").text(savedTitle),
                $("<td>").text(savedLoc),
                $("<td>").text(savedCompany),
                $("<td>").text(savedURL)
            )
            $(".job-info-saved").append(newRow);
            console.log("appended");
        }
        $(document).on("click", ".erase-button", function (e) {
            newAutoId = $(this).attr("data-id")
            console.log(newAutoId)
            var removeRef = firebase.database().ref($(this).attr("data-id"))
            e.preventDefault()
            console.log("erase")
            console.log(snapshot.val())
            var userId = $(this).attr("data-userid")
            var removeTitle = $(this).attr("data-title")
            console.log(userId)
            console.log(snapshot.val().userid)
            // var removeRef = firebase.database().ref('users');
            if (snapshot.val().userid === userId && snapshot.val().title === removeTitle) {
                removeRef.remove()
                    .then(function () {
                        console.log("Remove succeeded.")
                    })
                    .catch(function (error) {
                        console.log("Remove failed: " + error.message)
                    });
            }

        })
   
})
})