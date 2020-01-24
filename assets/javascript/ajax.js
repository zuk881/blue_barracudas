$(document).ready(function(){ 
    console.log("ready")
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    




















    
    //writing ajax functionality for the github jobs api
    var description = "javascript"
    var location = "phoenix"
    var queryURL = "https://jobs.github.com/positions.json?description="+description+"&location="+location

    $.ajax ({
        url: queryURL,
        method:"GET"
    }).then(function(response){
        var results = response
        console.log(results)
    })
})