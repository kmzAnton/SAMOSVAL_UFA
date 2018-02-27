$('document').ready(function(){
  var width_begin = $(window).width();
  var zone_num, material, volume;
  
  $('.get_price_circle').css({'top':$(window).height()/2,'left': $('.side').width()-120});
  
  
  if(width_begin<=992){
    $('.get_price_circle').hide();
  }
  if(width_begin<=992){
    $('.side').hide();
    $('.container-fluid .middle_page').width(width_begin-90);
    $('.get_price_circle').hide();
  }
  if(width_begin>576 && width_begin<=1200){$('.add').hide();}
  
  
  $(window).on('scroll', function () {
      var scrollTop = $(window).scrollTop();
      $(document).mousemove(function(event) {
        var posX = event.pageX;
        var posY = event.pageY;
        if (scrollTop > 350) {
            $('.get_price_circle').stop().animate({top: posY-10},400);
        }
      });
  });
  

  $(window).resize(function(){
    var width_resize = $(window).width();
    $('.get_price_circle').css('left', $('.side').width()-120);
    if(width_resize<=992){
      $('.side').hide();
      $('.container-fluid .middle_page').width(width_resize-90);
    } else{
      $('.side').show();
      $('.container-fluid .middle_page').width(width_resize/2);
    }
    if(width_resize<=576){
      $('.show_res').css('font-size','70px');
      $('.card-title').css("height","70px");
    }
    else{
      $('.show_res').css('font-size','120px');
      $('.card-title').css("height","100px");
    }
    
    if(width_resize>576 && width_resize<=1250){$('.add').hide();}
    else{$('.add').show();}
  });
  
  $('.btn-sea').click(function(e){
    e.preventDefault();
    var btn_name = $(e.target).text().toString();
    zone_num = btn_name[btn_name.length-1];
    
    //IF WE CLICK GREEN-BUTTON
    if($(e.target).css("background-color")==='rgb(0, 128, 0)'){
      $(e.target).css('background-color', 'lightseagreen');  
      $('.add2').slideToggle('slow');
      $('.box'+zone_num).slideToggle('slow');
      $('.get_price').prop('disabled', true);
      $('.over_show_res').fadeOut(); 
      $('.over_show_res').hide();
      $('.show_res').text(null);
      $('.get_price_circle').hide();
      
    }else{
      // IF CLICK SEA-BUTTON AND THERE IS A GREEN-BUTTON
      if(($('.btn-sea').filter(function(){return $(this).css('background-color')==="rgb(0, 128, 0)"})).length>0){
        $('.col-sm-4').fadeOut('fast');
        $('.col-sm-4').hide('slow');
        $('.box'+zone_num).show('slow');
        $('.add2').show('slow');
        
        $('.btn-sea').css('background-color', 'lightseagreen');
        $(e.target).css('background-color', 'green');
      }else{
        // IF CLICK SEA BUTTON AND THERE IS NO A GREEN-BUTTON
        $('.box'+zone_num).slideToggle('slow');
        $('.add2').slideToggle('slow');
        $(e.target).css('background-color', 'green');
      }
    }
  });
  
  $('.options').click(function(e){
    material = $(e.target).parent().attr('class').split(' ')[2].split('+')[1].toString();
    volume = $(e.target).children('.for_btn').text().toString().trim().split(' ')[0];
    var child_for_btn = $(e.target).children('.for_btn');
    var hermano = $(e.target).parent().children('.get_price_bottom');
    
    if($(e.target).css("background-color")==="rgb(92, 184, 92)"){
      $(e.target).css('background-color', 'white');
      $('.get_price').prop('disabled', true);
      $(e.target).children('.for_btn').css('color', 'rgb(92, 184, 92)');
      volume=null;
      $('.get_price_circle').hide();
      if(window.innerWidth<=992){
        $('.get_price_bottom').slideUp(200);
      }
     }else{
        if(($('.options').filter(function(){return $(this).css('background-color')=="rgb(92, 184, 92)"})).length>0){
          $('.btn-sm').css('background-color','white')
          $(e.target).css('background-color', 'rgb(92, 184, 92)');
          $('.for_btn').css('color', 'rgb(94, 182, 94)');
          $(e.target).children('.for_btn').css('color', 'white');
          $('.get_price_circle').show();
          $('.get_price_bottom').slideUp();
          
          if(window.innerWidth<=992){
            hermano.slideDown(300);
          }
        }
        else{
          $(e.target).css('background-color', 'rgb(92, 184, 92)')
          $(e.target).children('.for_btn').css('color', 'white');
          $('.get_price_circle').show();
          if(window.innerWidth<=992){
            hermano.slideDown(300);
          }
        }
       
        if($('.get_price').prop('disabled')==true){
          $('.get_price').prop('disabled', false);
        }
       
        $('.oferta').hide();
        $('.over_show_res').fadeOut('slow'); 
        $('.over_show_res').hide();
        $('.show_res').text(null);
    }
  });
  
  
  $('.for_btn').click(function(e){
    material = $(e.target).parent().parent().attr('class').split(' ')[2].split('+')[1].toString();
    volume = $(e.target).text().toString().trim().split(' ')[0];
    var hermano = $(e.target).parent().parent().children('.get_price_bottom');
    
    if($(e.target).parent().css("background-color")==="rgb(92, 184, 92)"){
      $(e.target).parent().css('background-color', 'white');
      $('.get_price').prop('disabled', true);
      $(e.target).css('color', 'rgb(92, 184, 92)');
      volume=null;
      $('.get_price_circle').hide();
      
      if(window.innerWidth<=992){
        $('.get_price_bottom').slideUp(200);
      }
     }else{
      if(($('.options').filter(function(){return $(this).css('background-color')=="rgb(92, 184, 92)"})).length>0){
        $('.btn-sm').css('background-color','white')
        $(e.target).parent().css('background-color', 'rgb(92, 184, 92)');
        $('.for_btn').css('color', 'rgb(94, 182, 94)');
        $(e.target).css('color', 'white');
        $('.get_price_circle').show();
        
        $('.get_price_bottom').slideUp();
        if(window.innerWidth<=992){
          hermano.slideDown(300);
        }
      }
      else{
        $(e.target).parent().css('background-color', 'rgb(92, 184, 92)')
        $(e.target).css('color', 'white');
        $('.get_price_circle').show();
        
        if(window.innerWidth<=992){
          hermano.slideDown(300);
        }
      }
      
      if($('.get_price').prop('disabled')==true){
        $('.get_price').prop('disabled', false);
      }
      $('.oferta').hide();
      $('.over_show_res').fadeOut('slow'); 
      $('.over_show_res').hide();
      $('.show_res').text(null);
    }
  });
  
  
  $('.get_price_bottom').click(function(){
    $('.oferta').show();
    $('.over_show_res').show();
    $('.get_price_bottom').slideUp();
    $('html, body').animate({
        scrollTop: $(".show_res").offset().top
    }, 1000);
    $.ajax({
        url:'/getPrice',
        type:'POST',
        data:{zone:zone_num, mat:material, vol:volume},
        beforeSend:function(){$('.show_res').html('<img src="https://cdn.glitch.com/9c770fab-9959-42fe-a98c-ee6b265011df%2FLoader.gif?1519217575348">')},
        success: function(data){
          $('.show_res').html(data+"р");
          $('.get_price').prop('disabled', true);
        }
      });
  });
  
  $('.get_price_circle').click(function(){
    $('.get_price_circle').hide();
    $('.oferta').show();
    $('.over_show_res').show();
    $('html, body').animate({
        scrollTop: $(".show_res").offset().top
    }, 1000);
    $.ajax({
      url:'/getPrice',
      type:'POST',
      data:{zone:zone_num, mat:material, vol:volume},
      beforeSend:function(){$('.show_res').html('<img src="https://cdn.glitch.com/9c770fab-9959-42fe-a98c-ee6b265011df%2FLoader.gif?1519217575348">')},
      success: function(data){
        $('.show_res').html(data+"р");
        $('.get_price').prop('disabled', true);
      }
    });
  });
  
  $('.get_price').click(function(){
    $('.get_price_circle').hide();
    $('.oferta').show();
    $('.over_show_res').show();
    $.ajax({
      url:'/getPrice',
      type:'POST',
      data:{zone:zone_num, mat:material, vol:volume},
      beforeSend:function(){$('.show_res').html('<img src="https://cdn.glitch.com/9c770fab-9959-42fe-a98c-ee6b265011df%2FLoader.gif?1519217575348">')},
      success: function(data){
        $('.show_res').html(data+"р");
        $('.get_price').prop('disabled', true);
      }
    });
    
  });
  
  
  
  
});