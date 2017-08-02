/**
 * Created by Alisa on 02.08.17.
 */

var $rangeFilter = $('#slider-range');

$(function() {
    $rangeFilter.slider({
        range: true,
        min: 0,
        max: 30000,
        values: [2500, 20000],
        slide: function(event, ui) {
            $('#amount').val(ui.values[ 0 ] + 'р' + ' - ' + ui.values[1] + 'р');
        }
    });

    var value = $rangeFilter.slider('values', 0) + 'р'
                + ' - ' +
                $rangeFilter.slider('values', 1) + 'р';

    $('#amount').val(value);
});
