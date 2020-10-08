/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  
const theDate = function(time){                            //takes in the date from the object (used in createTweetElement line 60)
  let seconds = Math.floor((new Date() - (time))/1000);  //looking for difference between current date and the timestamp passed (converts Unicode time to seconds)
  let minutes = Math.floor(seconds/60);                  //converts to minutes
  let hours = Math.floor(minutes/60);                  //converts to hours
  let days = Math.floor(hours/24);                    //converts to days        
  if (days > 0){           
    if (days > 1) {
      return days + " days ago";                //series of conditions that return correct value depending on the difference from the line 11
    } return days + " day ago";
  }else if (hours > 0){
    if (hours > 1){
      return hours + " hours ago";
    }return hours + " hour ago";
  }else if (minutes > 0){
    if(minutes > 1){
      return minutes + " minutes ago"
    }return minutes + " minute ago"   
  } else if (seconds > 0){
    if (seconds > 1){
      return seconds + "seconds ago"
    }return seconds + "second ago"
  } else {
    return "just now"
  }

}


const escape =  function(str) {                        //takes in the input from the textarea and converts it to the string inside of a div (used in createTweetElement line 56)
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

const createTweetElement = function(postObj) {      //creates a tweet block from the object (5)
    let $tweet  = ""
    $tweet  += `<div class="tweets-container">`
    $tweet  += `<article class="tweet">`;
    $tweet  += `<div class="name">`;
    $tweet  += `<div class="photo">`;
    $tweet  += `<img class="img_profile" src="${postObj.user.avatars}" alt="bird" />`;   //returns an avatar
    $tweet  += `<h1 class="full_name">${postObj.user.name}</h1>`;       // returns an username
    $tweet  += `</div>`;
    $tweet  += `<h3 class="short_name">${postObj.user.handle}</h3>`;        //returns the handle
    $tweet  += `</div>`;
    $tweet  += `<div class="tweet-body">`;
    $tweet  += `<p class="tweet_text">${escape(postObj.content.text)}</p>`;    //returns the content
    $tweet  += `</div>`;
    $tweet  += `<footer class="tweet_footer">`;
    $tweet  += `<p>${theDate(postObj.created_at)}</p>`;     //returns the date
    $tweet += `<div class="icons">`
    $tweet  += `<i class="fa fa-star-o">`;
    $tweet  +=  `<i class="fa fa-retweet">`;
    $tweet  += `<i class=" fa fa-exclamation-triangle">`;
    $tweet += `</div>`
    $tweet  += `</footer">`;
    $tweet  += `</div>`;
    $tweet  += `</article>`;
    $tweet  += `</div>`;
  
    return $tweet ;
};

const addingTweets = {                            //(2)receives submit event and prevents page reload 
    correctField: function (event) {
      event.preventDefault();
      const input = $("textarea");
      if (input.val().length > 140) {       //checks if the textarea field in correctly
        $("#compose").prepend($("<div>").addClass("tweet-error").text("The tweet is too long!").fadeIn(200).fadeOut(4500)); //in case of an error a relevant message appeares before the form and fades with time delay
        return;
      }
      if (!input.val()) {
        $("#compose").prepend($("<div>").addClass("tweet-error").text("No text detected!").fadeIn(200).fadeOut(5000));
        return;
      }
      if (input.val() === null) {
        $("#compose").prepend($("<div>").addClass("tweet-error").text("No text detected!").fadeIn(200).fadeOut(5000));
        return;
      }
      
      const tweetContent = $("#new-tweet-area").serialize();   //converts the content of the textarea req to a URL string
      $.post("/tweets/", tweetContent, function () {  //posts the req to /tweets/ directory at the server and calls a function
        $("textarea").val("");    //empties the textarea
        loadTweets();   // calls the callback (line 103)
      });
    },
  };

  $("#compose").submit(addingTweets.correctField);   //(1)when the form submitted activates the callback (line 74)



const loadTweets = () => {        //(3)receives the data from the server
    $.ajax({
        url: "/tweets/",
        method: "GET",
        data: $("textarea").serialize(), 
        success: function (data) {
           renderTweets(data);    //calls next function (line 115)
        }
    });
};

 
function renderTweets(tweets) {       //(4)receives data from server 
    tweets.forEach(data => {
        $("#tweets-container").prepend(createTweetElement(data));     //adds the new tweet created on line 44 to the DOM 
    });
}  

    
});

