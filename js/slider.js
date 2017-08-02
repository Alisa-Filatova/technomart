/**
 * Created by Alisa on 02.08.17.
 */

var  $btnNext = $('.slider-controls-right');
var  $btnPrev = $('.slider-controls-left');
var  $slide = $('.slide');
var  translateWidth = 0;
var  slideCurrent = 1;
var  slideCount = $slide.length;
var  slideInterval = 7000;

function nextSlide() {

    if (slideCurrent <= 0 || slideCurrent >= slideCount) {
        $slide.css('transform', 'translate(0, 0)');

        slideCurrent = 1;
    } else {
        translateWidth = -$slide.width() * slideCurrent;
        $slide.css('transform', 'translate(' + translateWidth + 'px, 0)');
        slideCurrent++;
    }
}

function prevSlide() {

    if (slideCurrent == 1 || slideCurrent <= 0 || slideCurrent > slideCount) {
        translateWidth = -$slide.width() * (slideCount - 1);
        $slide.css('transform', 'translate(' + translateWidth + 'px, 0)');
        slideCurrent = slideCount;
    } else {
        translateWidth = -$slide.width() * (slideCurrent - 2);
        $slide.css('transform', 'translate(' + translateWidth + 'px, 0)');
        slideCurrent--;
    }

}

var switchInterval = setInterval(nextSlide, slideInterval);

$slide.mouseenter(function() {
    clearInterval(switchInterval);
});

$slide.mouseleave(function() {
    switchInterval = setInterval(nextSlide, slideInterval);
});

$btnNext.on('click', function() {
    nextSlide();
});

$btnNext.mouseenter(function() {
    clearInterval(switchInterval);
});

$btnNext.mouseleave(function() {
    switchInterval = setInterval(nextSlide, slideInterval);
});

$btnPrev.on('click', function() {
    prevSlide();
});

$btnPrev.mouseenter(function() {
    clearInterval(switchInterval);
});

$btnPrev.mouseleave(function() {
    switchInterval = setInterval(nextSlide, slideInterval);
});