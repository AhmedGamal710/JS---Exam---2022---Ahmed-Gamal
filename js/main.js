$(".div");
$('.home').animate({ width:'100%'},2000)
.animate({height:'100%'},2000,function(){
  $('h1').show(2000,function(){
    $('.item').slideDown(2000)
  });
})