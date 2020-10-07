/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

//  const dateConvert = function(sec) {
//     const milliseconds = sec * 1000 
//     const dateObject = new Date(milliseconds);
//     const humanDateFormat = dateObject.toLocaleString();
//     return humanDateFormat;
//     }


const theDate = function() {
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
return dateTime;
}
const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

const createTweetElement = function(postObj) {
    console.log("postObj: ", postObj);
    let $tweet  = ""
    $tweet  += `<div class="tweets-container">`
    $tweet  += `<article class="tweet">`;
    $tweet  += `<div class="name">`;
    $tweet  += `<div class="photo">`;
    $tweet  += `<img class="img_profile" src="${postObj.user.avatars}" alt="bird" />`;
    $tweet  += `<h1 class="full_name">${postObj.user.name}</h1>`;
    $tweet  += `</div>`;
    $tweet  += `<h3 class="short_name">${postObj.user.handle}</h3>`;
    $tweet  += `</div>`;
    $tweet  += `<div class="tweet-body">`;
    $tweet  += `<p class="tweet_text">${escape(postObj.content.text)}</p>`;
    $tweet  += `</div>`;
    $tweet  += `<ul>`;
    $tweet  += `<footer class="tweet_footer">`;
    $tweet  += `<p>${theDate()}</p>`;
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

const addingTweets = {
    successfulTweet: function (event) {
      event.preventDefault();
      const input = $("textarea");
      if (input.val().length > 140) {
        $("#compose").prepend($("<div>").addClass("tweet-error").text("The tweet is too long!").fadeIn(200).fadeOut(4500));
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

      const tweetContent = $("#compose").serialize();
      $.post("/tweets/", tweetContent, function () {
        $("textarea").val("");
        loadTweets();
      });
    },
  };
  $("#compose").submit(addingTweets.successfulTweet);



const loadTweets = () => {
    $.ajax({
        url: "/tweets/",
        method: "GET",
        data: $("#compose").serialize(),
        success: function (data) {
           renderTweets(data);
        }
    });
}

   


function renderTweets(tweetsArray) {
    tweetsArray.forEach(tweetData => {
        $("#tweets-container").prepend(createTweetElement(tweetData));
    });
}
    
});

