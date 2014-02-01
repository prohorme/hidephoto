var iteration = 0;  
var limitation= 0;
var fb = undefined; 


var sas = function() {
  if(window.location.href != $('#myprofile')[0].href) { 
   fb.hide(); 
    showFastBox('Error','Go to your profile page and try again.'); 
    return; 
  }
  if(iteration == limitation) { 
    fb.hide(); // прячем фастбокс
    showFastBox('VK HidePhoto', 'Photos successfully hidden! :)'); 
    return; 
  }
  try { 
    $('.profile_photo_hide')[0].click(); 
  } catch(e) {
    console.log('DEPH ERROR '+e); 
    fb.hide(); // прячем фастбокс
    showFastBox('VK HidePhoto Error','Error in the photo...'+iteration.toString()+'<br>'+e.toString()); 
    return; // убиваемсо
  } //try
  iteration = iteration + 1; 
  setTimeout(sas, 500); 
}//сас


var dephotify = function() {
  var input = $('#depho_amt').val(); 
    firstBox.hide(); 
  if(isNaN(parseInt(input))) {  
   showFastBox('Invalid input!', 'Type the numbers!');
   return;
  }
  limitation = parseInt(input); /
  sas(); 
  fb = showFastBox('VK HidePhoto','Goes hide images wait ...'); 
  fb.removeButtons(); 
  fb.showProgress(); 
  $('.box_x_button')[0].style.display="none"; 
}//dephotify

var firstBox = undefined;


var main = function() {
  firstBox = showFastBox('VK HidePhoto','How many photos can be removed from the panel?','Hide', function() { dephotify(); }, 'Cancel');
  firstBox.bodyNode.innerHTML =  firstBox.bodyNode.innerHTML + "<br><input type=\"text\" id=\"depho_amt\" placeholder=\"Nubmer, example 5\" value=\"5\">";
}//main

main();
