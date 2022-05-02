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

async function downloadFile(fileName) {
    const url = 'https://rickryanmedillo.netlify.app/assets/RickRyanMedillo.docx';

    const link = document.createElement('a');
    link.href = await toDataURL(url);
    link.setAttribute('download', fileName ? fileName : url.split('/').pop());
    link.setAttribute('target', 'blank');
    document.body.appendChild(link);
    link.click();
}


function toDataURL(url) {
    return fetch(url)
        .then((response) => {
            return response.blob();
        })
        .then((blob) => {
            return URL.createObjectURL(blob);
        });
}

$('#datatableexample').DataTable( {
    responsive: true
} );