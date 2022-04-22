function navslide() {
    // add active link if visited
    var url = window.location;
    var element = $('.toggledAnother ul li a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).addClass('active').parent().parent().addClass('in').parent();

    window.toggle = function() {
    jQuery(".toggledAnother")
        .stop(true, true)
        .animate({ width: "toggle" }, 400);
    };

    
}

document.addEventListener('DOMContentLoaded', function(){
    Code.photoSwipe('a', '#Gallery', { captionAndToolbarHideOnSwipe: false } );
}, false);