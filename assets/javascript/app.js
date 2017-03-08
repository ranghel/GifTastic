$(document).ready(function() {

	// Topics array
	var topics = ["Soccer", "Basketball", "Volleyball", "Boxing", "Cycling", "Tennis", "Hockey", "Skiing", "Golf", "Baseball"];

	// Display all the gifs 
	function gifsDisplay() {
		var sport = $(this).attr("data-name");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=dc6zaTOxFJmzC&limit=10";

		// Creating an AJAX call for the specific sport button that is clicked
		$.ajax({
			url: queryURL,
			method: 'GET'
		}).done(function(response) {
			console.log(response);
			$("#gifcontainer").empty();
			// Storing the response data
			var results = response.data;
			for (var i = 0; i < results.length; i++) {
				// Creating a div to hold the gif
				var gifDiv = $("<div>");
				gifDiv.addClass("gifDiv"); // added class for styling purposes
				// Getting the rating and creating the element to hold the rating
				var rating = $("<p>").text("Rating: " + results[i].rating);
				gifDiv.append(rating);
				// Getting gif images
				var image = $("<img>");
				image.attr("src", results[i].images.fixed_height_small_still.url);
				image.attr("data-still", results[i].images.fixed_height_small_still.url);
				image.attr("data-animate", results[i].images.fixed_height_small.url);
				image.attr("data-state", "still");
				image.addClass("image");
				gifDiv.append(image);
				$("#gifcontainer").prepend(gifDiv);

			}
		});
	}

	// Function for displaying topic buttons
	function renderButtons() {
	$("#buttons").empty(); // deleting the sport buttons prior to adding new sport buttons to prevent repeat buttons

		// Looping through the array of topics
		for (var i = 0; i < topics.length; i++) {
		// Dynamicaly generate buttons for each topic in the array.
		var gifButton = $("<button>");
		gifButton.addClass("sport"); // Adding a class
		//gifButton.addClass("btn btn-default"); 
		gifButton.attr("data-name", topics[i]); // Adding a data-attribute with a value of the topic at index i
		gifButton.text(topics[i]); // Provide button's text with the value of the topic at index i
		$("#buttons").append(gifButton); // Adding the button to HTML
		}	
	}

	// Function handles events where one button is clicked
	$("#add-sport").on("click", function(event) {
		event.preventDefault();
		
		var sport = $("#user-input").val().trim();
			if (sport == "") {
				alert("Input required!")
	 			return false; // Prevents blank inputs
			}
		topics.push(sport);
		renderButtons();
		// Clears user-input when submit button is clicked
		$("form").trigger("reset");
	
	});

	// Adding event listener for static vs animated when clicking on images
	$(document).on("click", ".image", function() {
		var state = $(this).attr("data-state");
		if (state == "still") {
			$(this).attr("src", $(this).data("animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).data("still"));
			$(this).attr("data-state", "still");
		}
	});
	// Adding event listener to all elements with a class of "sport"
	$("#buttons").on("click", ".sport", gifsDisplay);

	// Calling the renderButtons function to display the initial buttons
	renderButtons();

});