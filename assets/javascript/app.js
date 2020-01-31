var resultsArr = ["job1", "job2", "job3", "job4"];

function handleSearch(e) {
    e.preventDefault();
    
    // create a new div for each job result in the array with a unique id corresponding with the index of the item
    resultsArr.map(function(key,value) {
      var newResult = $("<div>");
      newResult.addClass("search-result");
      newResult.attr("id","result-" + key);
      var resultTitle = $("<h2>");
      resultTitle.addClass("result-title");
      resultTitle.text(value);
      newResult.append(resultTitle);

      // append to div on page
      $("#2").append(newResult);
    });
}


    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, options);
      });
    
      // Or with jQuery
    
      $(document).ready(function(){
        $('.sidenav').sidenav();
      });
 
// Event listener to handle search button clicks

$(document).on("click", "#search", handleSearch);
