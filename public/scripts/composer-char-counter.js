$(document).ready(function() {
  const characterCount = "#new-tweet-area";
  function updateCount(){
        var max = 140;
        var len = $(this).val().length;
        $('.counter').text(max - len);
        if (len >= max) {
          $('.counter').addClass('red');
        } 
      };

    // $('.submit_button').on('click', () => addNewLine('#new-tweet-area', '.tweet_text'))
    $(characterCount).keyup(updateCount);
    $(characterCount).mouseup(updateCount);
    $(characterCount).mouseout(updateCount);
    $(characterCount).change(updateCount);
    
  });