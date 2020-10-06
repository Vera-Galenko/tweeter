$(document).ready(function() {
    $('#new-tweet-area').keydown(function () {
        var max = 140;
        var len = $(this).val().length;
        $('.counter').text(max - len);
        if (len >= max) {
          $('.counter').addClass('red');
        } 
      });

    // $('.submit_button').on('click', () => addNewLine('#new-tweet-area', '.tweet_text'))
    
  });