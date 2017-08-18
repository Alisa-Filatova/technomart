var RUB = ' &#8381';
var dataUrl = 'data/items.json';

/**
 * Создает разметку товара
 *
 * @param {Object} item 
 * @return {String}
 */
function createItemHtml(item) {
    return (
        '<div class="item ' + (item.new ? 'new' : '') + '" id="' + item.title + '" data-price="' + item.price + '">' +
            '<div class="actions">' +
                '<a href="#" class="buy">Купить</a>' + 
                '<a href="#" class="bookmark">В закладки</a>' +
            '</div>' +
            '<div class="item-img">' +
                '<img src="' + item.image + '" alt="'+ item.title +'" width="218" height="168">' +
            '</div>' +
            '<p class="item-name">' +
                '<span class="item-type">Перфоратор</span> ' + 
                '<span class="item-brand">' + item.brand + '</span> ' +
                '<span class="item-model">' + item.model + '</span>' +
            '</p>' +
            '<span class="old-price">' + item.oldPrice + RUB + '</span>' +
            '<br>' +
            '<span class="btn-price">' + item.price + RUB + '</span>' +
        '</div>' 
    );
}

var $popularItems = $('#popular-items');

$(function() {
    $.getJSON(dataUrl).done(function(data) {
            $.each(data, function(index, item) {
                if (item.popular === true && $('.item').length <= 3) {
                    var itemHtml = createItemHtml(item);
                    $popularItems.append(itemHtml);   
                } 
            });   
        }).fail(function() { 
        alert('Ошибка загрузки!'); 
    })
});

