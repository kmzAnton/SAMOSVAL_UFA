$('document').ready(function(){
  
  $('.elem_header').click(function(e){
    var parent = $(e.target).parent().parent().parent().attr('id');
    var zone_num =parent[parent.length-1]; 
    var mat = e.target.value;

    $.ajax({
      url: '/getMaterials',
      data: {zone_num, mat},
      type: 'POST',
      beforeSend:function(){$('.volumes').html('')},
      success: function(data){
        if(data){
          var info = JSON.parse(data);
          $('#inputZone').val(zone_num);
          $('#inputName').val(info.name);
          $('#inputHeader').val(info.header);
          $('#inputDesc').val(info.desc);
          if(info.isAvail===Boolean(true)){
            $('#true').click();
            // $('#true').addClass('active');
            // $('#true').attr('checked', true)
            // $('#false').removeClass('active');
            // $('#false').attr('checked', false)
          }else{
            $('#false').click();
            // $('#false').addClass('active');
            // $('#false').attr('checked', true)
            // $('#true').removeClass('active');
            // $('#true').attr('checked', false)
          }
          
          info.vol.forEach(function(item, ind){
            var html='';
            html+= "<div class='col-sm-6'>";
            html+=   '<button class="btn btn-primary vols" type="button" data-toggle="collapse" data-target="#collapseExample'+item.amount+'" aria-expanded="false" aria-controls="collapseExample">';
            html+=     item.amount+' м<sup>3</sup>';
            html+=   '</button>';
            html+=   '<div class="collapse" id="collapseExample'+item.amount+'">';
            html+=     '<div class="card card-body">';
            html+=       'Кол-во:';
            html+=       '<input class="form-control" name="inputAmount+'+ind+'" value="'+item.amount+'">';
            html+=       'Доступен?:';
                          if(item.isAvail===true){
            html+=                '<div class="btn-group btn-group-toggle" data-toggle="buttons">';
            html+=                   '<label class="btn btn-secondary active">';
            html+=                    '<input type="radio" name="subOptions+'+ind+'" id="option1" autocomplete="off" value="true" checked> Да';
            html+=                  '</label>';
            html+=                  '<label class="btn btn-secondary">';
            html+=                    '<input type="radio" name="subOptions+'+ind+'" id="option2" autocomplete="off" value="false"> Нет';
            html+=                  '</label>';
            html+=                '</div>';
                          }else{
            html+=                '<div class="btn-group btn-group-toggle" data-toggle="buttons">';
            html+=                   '<label class="btn btn-secondary">';
            html+=                    '<input type="radio" name="subOptions+'+ind+'" id="option1" autocomplete="off" value="true"> Да';
            html+=                  '</label>';
            html+=                  '<label class="btn btn-secondary active">';
            html+=                    '<input type="radio" name="subOptions+'+ind+'" id="option2" autocomplete="off" value="false" checked> Нет';
            html+=                  '</label>';
            html+=                '</div>';
                          }
            html+=       'Цена:';
            html+=       '<input class="form-control" name="inputPrice+'+ind+'" value="'+item.price+'">';
            html+=     '</div>';
            html+=   '</div>';
            html+= '</div>';
            console.log(html);
            $('.volumes').append(html);
          });
          
          $('input[type="submit"]').removeClass('hidden');
        }
      }
    
    });
  });
  
});