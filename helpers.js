function init(e){
    if ($('#instafeed').length > 0) {
        var feed = new Instafeed({
            get: 'user',
            userId: '196558634',
            clientId: 'da5cf03899eb49a496424d9a76bafa0d',
            template: '<a class="ig_image" target=_blank href="{{link}}" title="{{caption}}" ><img src="{{image}}" /></a>',
            limit : 10

        });
    
        feed.run();
    }
}