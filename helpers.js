function init(e){
    $('<div class="modal-backdrop custom_backdrop"><img src="http://assets.codecloudapp..com/sites/554a79236e6f64713f000000/69e8cd982124dc73de1f5a67a627ee75/loading.gif" class="" alt=""></div>').appendTo(document.body);
    
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