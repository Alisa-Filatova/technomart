/**
 * Created by Alisa on 02.08.17.
 */

var $rangeFilter = $('#slider-range');

$(function() {
    $rangeFilter.slider({
        range: true,
        min: 0,
        max: 35000,
        step: 100,
        values: [5100, 32500],
        slide: function(event, ui) {
            for (var i = 0; i < ui.values.length; ++i) {
                $('input.sliderValue[data-index=' + i + ']').val(ui.values[i]);
            }
        }
    });

    $('input.sliderValue').change(function() {
        var $this = $(this);
        $rangeFilter.slider('values', $this.data('index'), $this.val());
    });
});
