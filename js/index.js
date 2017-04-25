var popup = document.querySelector('.modal-post-form');
var login = popup.querySelector('[name=name-id]');
var overlay = document.querySelector('.modal-overlay');
var link = document.querySelector('.post-form-btn');

link.addEventListener('click', function(event) {
     event.preventDefault();
     popup.classList.add('modal-post-form-show');
     overlay.classList.add('modal-overlay-show');
     login.focus();
});

var close = document.querySelector('.close-cross');

close.addEventListener('click', function(event) {
    event.preventDefault();
    popup.classList.remove('modal-post-form-show');
    overlay.classList.remove('modal-overlay-show');
});

var form = popup.querySelector('form');
var email = popup.querySelector('[name=e-mail]');

form.addEventListener('submit', function(event) {
    if (!login.value || !email.value) {
        event.preventDefault();
        popup.classList.add('modal-post-form-error');
   }
});

var mapOpen = document.querySelector('.map');
var map = document.querySelector('.modal-content-map');

mapOpen.addEventListener('click', function(event) {
    event.preventDefault();
    map.classList.add('modal-content-map-show');
    overlay.classList.add('modal-overlay-show');
});

var mapClose = document.querySelector('.modal-content-close');

mapClose.addEventListener('click', function(event) {
    event.preventDefault();
    map.classList.remove('modal-content-map-show');
    overlay.classList.remove('modal-overlay-show');
});
