

  function searchRecipeByIngredients() {

    $("#userDir").text("Click on an image to get the recipe");

    // sets newRecipe to the value of ingredientSearchTerm, which is returned from Firebase in app.js
    var newRecipe = ingredientSearchTerm;
    
      // console.log("Ingredient search term is: " + ingredientSearchTerm);

    // Constructing a queryURL using the user input stored in the newRecipe variable
    var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=" + newRecipe + "&limitLicense=false&number=4&ranking=1";

      // console.log(queryURL);
        
    // Performing an AJAX request with the queryURL
    $.ajax({
      headers: {
        "X-Mashape-Key": "O8cILmkawTmsh422cdG88s3nvdobp1Mz7E0jsnq3EpxgBPdyg8",
        "Accept": "application/json"
      },
        url: queryURL,
        method: "GET"
        
    // After data comes back from the request
    }).done(function(response) {
      
      $("#imageFood").html("");
            
        // console.log(response);
        
      // Looping through each API recipe result 
      for (var i = 0; i < response.length; i++) {
        
        // Creating and storing a div tag
        var recipeDiv = $("<div class='card-content'>");

              // ^^^Wondering if this work better as just "<div>", then a separate .addClass for "card-content light-blue" #lcb

        // Creating and storing an image tag
        // var recipeImage = $("<img width=100px height=auto>");
        var recipeImage = $("<img width=250px height=auto>");

        //this adds the class food to all images
        recipeImage.addClass("food card-image");

        // Setting the src attribute of the image to a property pulled off the result item
        recipeImage.attr("src", response[i].image);
        recipeImage.attr("data-id", response[i].id);

          // console.log("This is the image: " + recipeImage);

        var recTitle = $("<span class='card-title'>").text(response[i].title);
                
        // put the recipe image in the recipe div
        recipeDiv.append(recipeImage);
        recipeDiv.append(recTitle);

        var recipeCard = $("<div class='card medium'>").append(recipeDiv)
                
        // display the recipe image to the html
        $("#imageFood").append(recipeCard);
      };

    });
    // ^^^Closes ajax1 done function
  };

$(document).ready(function() {
  /*create an onclick function which calls the Get recipe information 
  create a link that will show step by step instructions, ingredient list, 
  the recipe title, image, and time to make*/
  $("body").on("click", ".food", function(event) {

    /*to make it switch to another page, location.href- #maybe add the id
    look into the id tag*/
    event.preventDefault();

      // console.log("The Image was clicked");

    //need to grab the image id of the specific image clicked
    var imgId = $(this).attr("data-id");
      // console.log(imgId);
   
    var query2URL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + imgId + "/information?includeNutrition=false"
      // console.log(query2URL);

    $.ajax({
      headers: {
        "X-Mashape-Key": "O8cILmkawTmsh422cdG88s3nvdobp1Mz7E0jsnq3EpxgBPdyg8",
        "Accept": "application/json"
      },
      url: query2URL,
      method: "GET"
    }).done(function(data) {

      // *******CLEAR FOR DETAIL CARD HERE
      $("#recipe-detail").html("");
      // $("#imageFood").html("");
      $("#userDir").text("");
    
      // console.log(data);

      /*display the step 
      by step instructions, ingredient list, 
      the recipe title, image, and time to make
      *and possibly push them to firebase */

      var recipeDetailDiv = $("<div class='card-content'>");
      var recipeClicked = $("<img width=300px height=auto>");
      var recipeImage = $("<img class='card-image' width=250px height=auto>");
      
      //this adds the class food to all images
      recipeImage.addClass("food");

      // Setting the src attribute of the image to a property pulled off the result item
      recipeImage.attr("src", data.image);
        
      var recTitle = $("<span class='card-title'>").html(data.title);
      var ingredientList = "";
      
      for (i in data.extendedIngredients) {
        
        ingredientList += data.extendedIngredients[i].originalString + "<br>";
      };
      // ^^Added semi-colon here #lcb

      var ingredList = $("<p>" + "<br>").html("Ingredients: " + ingredientList);
      var timeToMake = $("<p>" + "<br>").text("Total Time: " + data.readyInMinutes);
      var servings = $("<p>" + "<br>").text("Serving Size: " + data.servings);
      var directions = $("<p>" + "<br>").text( data.instructions);
      
      //setting the src attribute to multiple properties pulled off the data from JSON
      // recipeClicked.addClass("img", recipe);
      recipeClicked.attr("src", data.image);
        
      recipeDetailDiv.append(recipeImage);
      recipeDetailDiv.append(recTitle);
      recipeDetailDiv.append(ingredList);
      recipeDetailDiv.append(timeToMake);
      recipeDetailDiv.append(servings);
      recipeDetailDiv.append(directions);

      var recipeDetailCard = $("<div class='card s6'>").append(recipeDetailDiv);
        
      $("#recipe-detail").append(recipeDetailCard);
    });
    // ^^Ajax2 done
  });
  // ^^Closes body on-click
});
// ^^Should close the overall doc on-ready... unsure why it isn't linking #lcb
