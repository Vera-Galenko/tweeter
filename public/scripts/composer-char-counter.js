$(document).ready(function() {           
  const characterCount = "#new-tweet-area";
  function updateCount(){
        var max = 140;
        var len = $(this).val().length;    //counts symbols in textarea 
        $('.counter').text(max - len);
        if (len >= max) {
          $('.counter').addClass('red');   //counter becomes red if the number exceeds 140
        } else {
          $('.counter').removeClass('red');  //counter becomes grey if the number does not exceed 140
        } 
      }

    $(characterCount).keyup(updateCount);
    $(characterCount).mouseup(updateCount);
    $(characterCount).mouseout(updateCount);
    $(characterCount).change(updateCount);
    
  });