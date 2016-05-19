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
    $('.open_menu').click(function(e){
        $('.mobile_menu').slideToggle();
        e.preventDefault()
    })
    
    $('#mobile_dd').click(function(e){
        $('.mobile_menu_dd').slideToggle();
        e.preventDefault()
    })
    
    $('#newsletter_form').submit(function(e){
        e.preventDefault();
        if ($("#newsletter_agree").prop("checked") != true){
            alert("Please agree to receive newsletters from " + site_json.name + "." );
            $("#newsletter_agree").focus();
            return false;
        }
        $.getJSON(
            this.action + "?callback=?",
            $(this).serialize(),
            function (data) {
                if (data.Status === 400) {
                    alert("Please try again later.");
                } else { // 200
                    $("#success_subscribe").fadeIn()
                    $('#success_subscribe').delay(2000).fadeOut();
                    $('#newsletter_form').trigger('reset')
                }
            }
        );
    });
}



function show_content(){
    $('.custom_backdrop').remove();
    $('.yield').fadeIn();
    $('.accordion_header').click(function(e){
        $(this).find('i').toggleClass('fa-chevron-down fa-chevron-up');
	});
	
	$('.open_stores').click(function(e){
	    var initial = $(this).attr('data-initial')
	    $('.open_' + initial).slideToggle();
	    $(this).find('i').toggleClass('fa-chevron-down fa-chevron-up');
	})
	
	var hours = getMallHours();
	var monday = {};
	var saturday = {};
	var sunday = {};

    $.each(hours, function(i, v){
        if (v.day_of_week == 1){
            monday = v
        }
        if (v.day_of_week == 0){
            sunday = v
        }
        if (v.day_of_week == 6){
            saturday = v
        }
    })
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
        if ($(window).width() > 768){
            rows.show();
        }
        else{
            rows.hide();
        }
        $.each($('.store_initial'), function(i, val){
           if ($(val).text().trim().length > 0){
               $(val).show();
           } 
        });
        
        $('#cat_name').hide();
        e.preventDefault();
    });
    
}

function get_day(id){
    switch(id) {
        case 0:
            return ("Sunday");
            break;
        case 1:
            return ("Monday");
            break;
        case 2:
            return ("Tuesday");
            break;
        case 3:
            return ("Wednesday");
            break;
        case 4:
            return ("Thursday");
            break;
        case 5:
            return ("Friday");
            break;
        case 6:
            return ("Saturday");
            break;
    }
}


function convert_hour(d){
    var h = (d.getUTCHours());
    var m = addZero(d.getUTCMinutes());
    var s = addZero(d.getUTCSeconds());
    if (h >= 12) {
        if ( h != 12) {
            h = h - 12;    
        }
        
        i = "pm"
    } else {
        i = "am"
    }
    return h+":"+m+i;
}



function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function get_month (id){
    var month = "";
    switch(id) {
        case 0:
            month = "Jan";
            break;
        case 1:
            month = "Feb";
            break;
        case 2:
            month = "Mar";
            break;
        case 3:
            month = "Apr";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "Jun";
            break;
        case 6:
            month = "Jul";
            break;
        case 7:
            month = "Aug";
            break;
        case 8:
            month = "Sep";
            break;
        case 9:
            month = "Oct";
            break;
        case 10:
            month = "Nov";
            break;
        case 11:
            month = "Dec";
            break;
            
    }
    return month;
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function drop_pin(id){
    map.marksHide();
    var coords = map.get_coords(id);
    var height = parseInt(coords["height"]);
    var width = parseInt(coords["width"]);
    var x_offset = (parseInt(width) / 2);
    var y_offset = (parseInt(height) /2);
    map.setMarks([{ xy: [coords["x"] - 46 + x_offset, coords["y"] - 110 + y_offset],
        attrs: {
            src:  'http://assets.codecloudapp.com/sites/56ba0abc6e6f644468020000/image/png/1452532624000/pin_93.png'
        }
    }]);
    map.setViewBox(id);
    $('#btnZoomIn').click()
}

function load_map(reg, store_details){
    this_region = {};
    this_region = store_details.svgmap_region;
    map = $('#mapsvg_store_detail').mapSvg({
        source: getSVGMapURL(),    // Path to SVG map
        colors: {stroke: '#aaa', hover: 0, selected: '#EF4D86'},
        disableAll: true,
        height:335,
        width:848,
        regions: reg,
        tooltipsMode:'custom',
        loadingText: "loading...",
        zoom: true,
        zoomButtons: {'show': false,'location': 'left' },
        pan:true,
        cursor:'pointer',
        responsive:true,
        zoomLimit: [0,5],
        viewBox:[420,420,1650,1650]
    });
    map.setViewBox(store_details.svgmap_region);
    map.selectRegion(store_details.svgmap_region);
    drop_pin(store_details.svgmap_region);
}

function init_map(reg){
    map = $('#mapsvg').mapSvg({
        source: getSVGMapURL(),    // Path to SVG map
        colors: {stroke: '#aaa', hover: '#EF4D86'},
        disableAll: true,
        height:800,
        width:1140,
        regions: reg,
        tooltipsMode:'custom',
        loadingText: "loading...",
        zoom: true,
        zoomButtons: {'show': true,'location': 'right' },
        pan:true,
        panLimit:true,
        cursor:'pointer',
        responsive:true,
        zoomLimit: [0,10],
        viewBox:[420,420,1650,1650]
    });
    
    
}