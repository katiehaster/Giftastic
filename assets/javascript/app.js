// api key: lzN4naF8vL5ezIjFsfSV71y2gPRedGt0

var characters = ["Harry Potter", "Hermione Granger", "Ron Weasley", "Dumbledore", "McGonagall", "Snape"];

var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    "character" + "&api_key=lzN4naF8vL5ezIjFsfSV71y2gPRedGt0&limit=10";



function renderButtons() {
    // Deleting the buttons prior to adding new characters
    // (this is necessary otherwise you will have repeat buttons)
    $("#charButtons").empty();

    // Looping through the array of characters
    for (var i = 0; i < characters.length; i++) {

        // Then dynamicaly generating buttons for each character in the array
        var a = $("<button>");
        console.log(a);
        // Adding a class of movie to our button
        a.addClass("hpChar");
        // Adding a data-attribute
        a.attr("data-name", characters[i]);
        // console.log(a.data("name"));
        // Providing the initial button text
        a.text(characters[i]);
        // Adding the button to the buttons-view div
        $("#charButtons").append(a);
    }
}

// This function handles events where one button is clicked
$("#submitButton").on("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var character = $("#userInput").val().trim();

    // The character from the textbox is then added to our array
    characters.push(character);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

});

// Calling the renderButtons function to display the intial buttons
renderButtons();



$("#charButtons").on("click", ".hpChar", function () {

    $("#gifs").empty();

    var charNameButton = ($(this).data("name"));

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        charNameButton + "&api_key=lzN4naF8vL5ezIjFsfSV71y2gPRedGt0&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })


        .then(function (response) {

            // store the data object as a variable so that we can loop over it
            var results = response.data;

            // loop through results array
            for (var i = 0; i < results.length; i++) {

                // create a new div using jquery
                var gifDiv = $("<div>");

                // stores rating from results object
                var rating = results[i].rating;

                // use jquery to create a new html p tag and using jquery .text() method, add rating as text
                var p = $("<p>").text("Rating: " + rating);

                // use jquery to create a new html img element
                var charImage = $("<img>");

                // reference personImage and using jquery .attr() method reference the url from the response object and feed it to the src attribute
                charImage.attr("src", results[i].images.fixed_height_still.url);
                charImage.attr("data-still", results[i].images.fixed_height_still.url);
                charImage.attr("data-animate", results[i].images.fixed_height.url);
                charImage.attr("data-state", "still");
                charImage.attr("class", "gif");

                console.log(charImage);

                // use jquery .prepend method to render the p variable to our gifDiv
                gifDiv.prepend(p);

                // use jquery .prepend method to render the personImage variable to our gifDiv
                gifDiv.prepend(charImage);

                // using jquery, select the div with id=gif-appear-here and use jquery prepend to render the gifDiv we just created
                $("#gifs").prepend(gifDiv);

                // onclick for each gif - animate - still

                
            };
            $(".gif").on("click", function () {

                var state = $(this).attr("data-state");
                console.log(state === "still");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");

                }

            });
        });
});    