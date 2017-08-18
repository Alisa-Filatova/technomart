// loader

var $loader = $('#floatingCirclesG');
var $overlay = $('.modal-overlay');
var $document = $(document);

$document.ajaxStart(function() {
    $loader.removeClass('invisible');
    $overlay.addClass('modal-overlay-show');
});

$document.ajaxComplete(function() {
    $loader.addClass('invisible');
    $overlay.removeClass('modal-overlay-show');
});
