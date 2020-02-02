$(document).ready(function () {
    // hide tables unless if statement is met
    $("#t1").hide();
    $("#t2").hide();
    $("#t3").hide();
    $("#t4").hide();
    // function to display results after submit button is pressed
    $("#submit").on("click", function (e) {
        e.preventDefault();

        // ajax call for USA Jobs
        var authKey = "1+O9aAwfO+XgebPVfqXfSkKAL3bb7wv4QItq/LRvqlA=";
        var topic = $("#keyword").val();
        var place = $("#location").val();

        //API key for USA Jobs
        var queryURL = "https://data.usajobs.gov/api/search?Keyword=" + topic + "&Location=" + place;

        //Ajax call
        $.ajax({
            url: queryURL,
            method: "GET",
            headers: {
                "Authorization-Key": authKey
            }
            //code that runs after ajax call
        }).then(function (response) {
            $(".job-info-1").empty();
            //display the USA Jobs table
            if (Array.length > 0) {
                $("#t1").show();
            }

            // variable to shorten the object path to the data we want to access
            var results = response.SearchResult.SearchResultItems;

            //map function that displays results to the table
            results.map(function (value, key) {

                // create new table row
                var newResult = $("<tr>");
                newResult.addClass("search-result");
                newResult.attr("id", "result-" + key);

                // creates a new button for saving job
                var saveButton = $("<a>").addClass("btn-floating btn-large waves-effect waves-light blue save-button").html('<i class="material-icons">save</i></a></button>')

                // add value to save button 
                saveButton.attr("data-url", value.MatchedObjectDescriptor.ApplyURI[0])
                saveButton.attr("data-title", value.MatchedObjectDescriptor.PositionTitle)
                saveButton.attr("data-company", value.MatchedObjectDescriptor.OrganizationName)
                saveButton.attr("data-loc", value.MatchedObjectDescriptor.PositionLocationDisplay)

                // create table cell
                var newSaveButton = $("<td>");

                // append button to the cell
                newSaveButton.append(saveButton);

                // add table data for job title, employer, location and description
                var newJobTitle = $("<td>").html("<a href='" + value.MatchedObjectDescriptor.ApplyURI[0] + "' target='_blank'>" + value.MatchedObjectDescriptor.PositionTitle + "</a>")
                var newEmployer = $("<td>").text(value.MatchedObjectDescriptor.OrganizationName);
                var newJobLocation = $("<td>").text(value.MatchedObjectDescriptor.PositionLocationDisplay);
                // add anchor tag to initialize the modal to the job description
                var newJobDescription = $("<td>").addClass("overflow-auto").html(value.MatchedObjectDescriptor.UserArea.Details.JobSummary.substring(0, 250) + "...<a  href='#usamodal" + key + "' class='modal-trigger'> see more </a>");

                // dynamically create modal
                var divContainer = $("<div class='modal' id='usamodal" + key + "'>");
                var divContent = $("<div class='modal-content'>")
                var header = $("<h4>").text("Job Description");
                header.prependTo(divContent);
                //add job description to modal
                var description = $("<p>").html(value.MatchedObjectDescriptor.UserArea.Details.JobSummary);
                description.appendTo(divContent);
                divContainer.append(divContent);
                divContainer.appendTo($(".dynamic-modal"));

                //add close button to modal
                var modalFooter = $("<div class='modal-footer'>");
                var modalFooterAnchor = $("<a href='#!' class='modal-close waves-effect waves-green btn-flat'>Close</a>");

                //append close button to modal
                modalFooterAnchor.appendTo(modalFooter);
                modalFooter.appendTo(divContainer);

                // append table data to new row
                newResult.append(newSaveButton).append(newJobTitle).append(newEmployer).append(newJobLocation).append(newJobDescription);

                // append new row to table body
                $(".job-info-1").append(newResult);

            });
            //required for the materialize modal to operate
            $(".modal").modal();

        })

        // $(".dynamic-modal-close-button").on("click", function () {
        //     $(".dynamic-modal").hide();
        // })


        //writing ajax functionality for the github jobs api

        var keyword = $("#keyword").val()
        var loc = $("#location").val()
        var queryURL = "https://jobs.github.com/positions.json?description=" + keyword + "&location=" + loc
        //the github jobs api returns html tags in the job description
        //this function removes html element
        function strip(html) {
            var doc = new DOMParser().parseFromString(html, 'text/html');
            return doc.body.textContent || "";
        }

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $(".job-info-2").empty();

            var resultsArr = response;

            if (Array.length > 0) {
                $("#t2").show();
            }

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
                //add anchor tag to job description. also stripped html elements from job description
                var newJobDescription = $("<td>").addClass("overflow-auto").html(strip(value.description).substring(0, 250) + "...<a  href='#githubmodal" + key + "' class='modal-trigger'> see more </a>");

                var divContainer = $("<div class='modal' id='githubmodal" + key + "'>");
                var divContent = $("<div class='modal-content'>")
                var header = $("<h4>").text("Job Description");
                header.prependTo(divContent);
                var description = $("<p>").html(strip(value.description));
                description.appendTo(divContent);
                divContainer.append(divContent);
                divContainer.appendTo($(".dynamic-modal"));
                //add close button to modal
                var modalFooter = $("<div class='modal-footer'>");
                var modalFooterAnchor = $("<a href='#!' class='modal-close waves-effect waves-green btn-flat'>Close</a>");
                //append close button to modal
                modalFooterAnchor.appendTo(modalFooter);
                modalFooter.appendTo(divContainer);

                // append table data to new row
                newResult.append(newSaveButton).append(newJobTitle).append(newEmployer).append(newJobLocation).append(newJobDescription);
                // append new row to the appropriate table body
                $(".job-info-2").append(newResult);

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
    //firebase references and global variables
    var database = firebase.database();
    var rootRef = database.ref();
    var userId;
    var autoId;
    //firebase function to check if the user is authenticated
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            userId = firebase.auth().currentUser.uid;
        } else {
            $(".favorites-table").hide();
            // No user is signed in.
            signInMessage = $("<p>").addClass("center-align").text("Please login to use the saved jobs feature.");
            signInMessage.appendTo($(".favorites-header"));
            // DON'T DELETE THIS CONSOLE LOG
            console.log("invalid")
        }
    });

    //logout function for auth user
    $("#logout").on("click", function () {
        firebase.auth().signOut()
        location.href = "auth.html"

    });

    //write the functionality of the save buttons
    //_______________________________________________
    //document click function that will allow the user to click
    //on the dynamically generated save buttons from the api calls that display in the save
    //column of the table rows
    //when the user clicks the save button
    $(document).on("click", ".save-button", function (e) {
        //the object will be pushed to firebase on that signed in users path
        e.preventDefault();

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
        });
    });
    //the saved jobs will then be pulled from firebase to be displayed on the favorites html page
    var savedAutoId;
    //use the child added function to take the values from the db

    rootRef.on("child_added", function (snapshot) {

        if (snapshot.val().userid === userId) {
            //and store them in new variables            
            var savedTitle = snapshot.val().title
            savedAutoId = snapshot.val().autoid

            var savedLoc = snapshot.val().location
            // console.log(savedLoc)
            var savedCompany = snapshot.val().company
            // console.log(savedCompany)
            var savedURL = snapshot.val().url
            var eraseButton = $("<a>").addClass("btn-floating btn-large waves-effect waves-light red erase-button").html('<i class="material-icons">delete</i></a></button>')
            eraseButton.attr("data-title", snapshot.val().title)
            eraseButton.attr("data-company", snapshot.val().company)
            eraseButton.attr("data-loc", snapshot.val().location)
            eraseButton.attr("data-url", snapshot.val().url)
            eraseButton.attr("data-id", savedAutoId)
            eraseButton.attr("data-userid", snapshot.val().userid)
            var appliedButton = $("<a target='_blank'>").addClass("btn-floating btn-large waves-effect waves-light apply-button").text('APPLY')
            appliedButton.attr("href", snapshot.val().url)
            // appliedButton.css("color", "#FFEFD5")

            var newRow = $("<tr>").append(
                $("<td>").text(savedTitle),
                $("<td>").text(savedCompany),
                $("<td>").text(savedLoc),
                $("<td>").html(appliedButton),
                $("<td>").html(eraseButton)

            )
            $(".job-info-saved").append(newRow);
            // console.log("appended");
        }
    })

    //on click function for the erase buttons
    //removes the saved job from both the real time database
    //as well as the saved jobs table

    $(document).on("click", ".erase-button", function (e) {
        newAutoId = $(this).attr("data-id")
        // console.log(newAutoId)

        e.preventDefault()

        var userId = $(this).attr("data-userid")
        var removeTitle = $(this).attr("data-title")

        var removeRef = firebase.database().ref($(this).attr("data-id"))

        removeRef.remove()
        // .then(function () {
        //invokes the reload function for the table
        location.reload();

    });

});