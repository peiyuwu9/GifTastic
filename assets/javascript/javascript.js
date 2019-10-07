//Defult some keywords
var topics = ["natural","animal","music","car"];

//Set a function to render keywords to button
function renderButtons() {

    // Clean the section before buttons rendered
    $("#button-display").empty();

    //Loop through the array of keywords
    for (var i=0; i<topics.length; i++) {

        //Create buttons
        var button = $("<button>");

        //Give buttons classes and values
        button.attr("class","btn btn-outline-info keyword-button").attr("button-name",topics[i]);

        //Print texts on button
        button.text(topics[i]);

        //Add buttons to display section
        $("#button-display").append(button);
    }
}

//Set a gif clear funcion
function clearGif() {
    $("#gif-display").empty();
}

//Generate defult buttons
renderButtons();

//Set a event listener for users to create button
$("#add-keyword").on("click", function(event){
    
    //Prevent the form from trying to submit without users confirmm
    event.preventDefault();

    //Push the keywords users input to the keyword array
    var userInput = $("#keyword-input").val().trim().toLowerCase();

    //Prevent users from generate repeat or empty buttons
    if (topics.indexOf(userInput) === -1 && $("#keyword-input").val() !== "") {
        topics.push(userInput);

        //Generate buttons
        renderButtons();
    }

    //Clear text field after click generate button
    $("#keyword-input").val("");  
})

//Once users click button, brower will retrieve gifs and information from Giphy database
$(document.body).on("click",".keyword-button", function(){

    //Clear gif div
    clearGif();

    //Grab keyword from button name
    var keyword = $(this).attr("button-name");

    //Limit numbers of gifs been shown
    var gifCount =10;

    //Access data base with keywords
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=p9OTXJik3NqMrPTxbEh02Kbk9tBALQNC&limit=" + gifCount + "&q=" + keyword;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(access){
        
        //Store retreived data from Giphy in results
        var results = access.data;
        
        //Diaply first 10 results
        for (var j=0; j<results.length; j++) {
            //Create div for each gif
            var eachGif = $("<div>");
            
            //Create div for title
            var resultTitle = $("<div>");
            resultTitle.text([j+1] + ". " + results[j].title);

            //Create div for rating
            var resultRating = $("<div>");
            resultRating.text("Rating: " + results[j].rating);
            
            //Create img for gif with all gif's url
            var resultImage = $("<img>");
            resultImage.attr("src",results[j].images.fixed_height_still.url).attr("image-still",results[j].images.fixed_height_still.url).attr("image-animate",results[j].images.fixed_height.url).attr("state","still").attr("class","gif");

            //Create add to favorite button
            var addToFavorite = $("<button>");
            addToFavorite.text("Add to favorite");
            addToFavorite.attr("class","add-to-favorite");
            addToFavorite.attr("src",results[j].images.fixed_height_still.url).attr("image-still",results[j].images.fixed_height_still.url).attr("image-animate",results[j].images.fixed_height.url).attr("state","still");
            
            //Append all above elements to single div
            eachGif.append(resultTitle).append(resultRating).append(resultImage).append("<br>").append("<i class='fas fa-star'></i>").append(addToFavorite);

            //Apeend single div to gid display div
            $("#gif-display").append(eachGif).append("<br>");
        }

        //Put a horizontal line
        $("#gif-display").append("<hr class = 'my-4'>");

    })

    //If users click see 10 more button, populating 10 more gifs
    $("#10-more-gifs").on("click",function(){

        gifCount = gifCount + 10;

        console.log(gifCount);

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=p9OTXJik3NqMrPTxbEh02Kbk9tBALQNC&limit=" + gifCount + "&q=" + keyword;

        console.log(queryURL);
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(access){
            
            //Store retreived data from Giphy in results
            results = access.data;
            
            console.log(results);

            //Diaply next 10 results
            for (var k = gifCount-10; k<results.length; k++) {
                //Create div for each gif
                var eachGif = $("<div>");
                
                //Create div for title
                var resultTitle = $("<div>");
                resultTitle.text([k+1] + ". " + results[k].title);
    
                //Create div for rating
                var resultRating = $("<div>");
                resultRating.text("Rating: " + results[k].rating);
                
                //Create img for gif with all gif's url
                var resultImage = $("<img>");
                resultImage.attr("src",results[k].images.fixed_height_still.url).attr("image-still",results[k].images.fixed_height_still.url).attr("image-animate",results[k].images.fixed_height.url).attr("state","still").attr("class","gif");
    
                //Create add to favorite button
                var addToFavorite = $("<button>");
                addToFavorite.text("Add to favorite");
                addToFavorite.attr("class","add-to-favorite");
                addToFavorite.attr("src",results[k].images.fixed_height_still.url).attr("image-still",results[k].images.fixed_height_still.url).attr("image-animate",results[k].images.fixed_height.url).attr("state","still");
                
                //Append all above elements to single div
                eachGif.append(resultTitle).append(resultRating).append(resultImage).append("<br>").append("<i class='fas fa-star'></i>").append(addToFavorite);
    
                //Apeend single div to gid display div
                $("#gif-display").append(eachGif).append("<br>");
            }
    
            //Put a horizontal line
            $("#gif-display").append("<hr class = 'my-4'>");
    
        })


    })
})

//Once users click on gif, gif will start animating, and click again will stop animation
$(document.body).on("click",".gif",function(){

    //Grab image state
    var currentState = $(this).attr("state");

    //If gif is still, change the src to animated src; vice versa.
    if (currentState === "still") {
        $(this).attr("src",$(this).attr("image-animate"));
        $(this).attr("state","animate");
    }
    else {
        $(this).attr("src",$(this).attr("image-still"));
        $(this).attr("state","still");
    }
})  

//Once users click add to favorite, gifs will populate in favorite div
$(document.body).on("click",".add-to-favorite",function(){
    var favoriteURL = $(this).attr("src");
    var favoriteImageStill = $(this).attr("image-still");
    var favoriteImageAnimate = $(this).attr("image-animate");
    var favoriteState = $(this).attr("state");
    var favoriteClass = $(this).attr("class");
    var favoriteGif = $("<img>");
    favoriteGif.attr("src",favoriteURL).attr("image-still",favoriteImageStill).attr("image-animate",favoriteImageAnimate).attr("state",favoriteState).attr("class","favorite-gif");

    $("#favorite-display").append(favoriteGif).append("<br><br>");
})

//Once users click on gif, gif will start animating, and click again will stop animation
$(document.body).on("click",".favorite-gif",function(){

    //Grab image state
    var currentState = $(this).attr("state");

    console.log(currentState);

    //If gif is still, change the src to animated src; vice versa.
    if (currentState === "still") {
        $(this).attr("src",$(this).attr("image-animate"));
        $(this).attr("state","animate");
    }
    else {
        $(this).attr("src",$(this).attr("image-still"));
        $(this).attr("state","still");
    }
})

//Clear clear button to clear gif div
$("#clear").on("click", function(){
    clearGif();
})

