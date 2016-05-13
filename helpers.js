function init(e){
    
    $('<div class="modal-backdrop custom_backdrop"><img src="http://assets.codecloudapp.com/sites/554a79236e6f64713f000000/69e8cd982124dc73de1f5a67a627ee75/loading.gif" class="" alt=""></div>').appendTo(document.body);
    
    if ($('#instafeed').length > 0) {
        var feed = new Instafeed({
            get: 'user',
            userId: '196558634',
            clientId: 'da5cf03899eb49a496424d9a76bafa0d',
            template: '<a class="ig_image" target=_blank href="{{link}}" title="{{caption}}" ><img src="{{image}}" /></a>',
            limit : 15
        });
        feed.run();
    }
}

function show_content(){
    $('.custom_backdrop').remove()
}

function show_cat_stores(){
    $('.show_cat_stores').click(function(e){
        var cat_id = $(this).attr('data-id');
        $('.active_cat').removeClass('active_cat');
        $(this).addClass('active_cat');
        var rows = $('.cats_row');
        rows.hide();
        $('.store_initial').hide();
        $('#cat_name').text($(this).text());
        $('#cat_name').css('display', 'block');
        $('#store_list_container, #store_list_container2').addClass("full_width");
        $.each(rows, function(i, val){
            var cat_array = val.getAttribute('data-cat').split(',');
            if ($.inArray(cat_id, cat_array) >= 0){
                $(val).show();
            }
        });
        $('html, body').animate({scrollTop : 0},800);
        e.preventDefault();
    });
    $('.show_all_stores').click(function(e){
        $('#store_list_container, #store_list_container2').removeClass("full_width");
        $('.active_cat').removeClass('active_cat');
        $(this).addClass('active_cat');
        var rows = $('.cats_row');
        rows.show();
        $.each($('.store_initial'), function(i, val){
           if ($(val).text().length > 0){
               $(val).show();
           } 
        });
        $('#cat_name').hide();
        e.preventDefault();
    });
    
}