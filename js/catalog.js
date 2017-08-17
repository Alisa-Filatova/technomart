var RUB = ' &#8381';

var dataUrl = 'data/items.json';
var $catalog = $('#items-catalog');

/**
 * Создает разметку товара
 *
 * @param {Object} item 
 * @return {String}
 */
function createItemHtml(item) {
    return (
        '<div class="item ' + (item.new ? 'new' : '') + '" id="' + item.title + '">' +
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

$(function() {
    $.getJSON(dataUrl).done(function(data) {
        $.each(data, function(index, item) {
            var itemHtml = createItemHtml(item);
            $catalog.append(itemHtml);
        });
    }).fail(function() { 
        alert('Ошибка загрузки!'); 
    })
});

// Фильтр

var $filterBtn = $('.filter-btn');
var $minPrice = $('#min-price');
var $maxPrice = $('#max-price');

$filterBtn.on('click', function(event) {
    event.preventDefault();

    $.getJSON(dataUrl).done(function(data) {
        var power = $('input[type=radio]:checked').val();
        var maxPrice = $maxPrice.val();
        var minPrice = $minPrice.val();

        var $checkedBrands = $('input[type=checkbox]:checked');
        
        var brands = $.map($checkedBrands, function(element) {
            return element.value; 
        });
       
        $catalog.empty();

        if ($filterPrice.hasClass('active')) {
            sortItemsByPrice(data);
        }
        
        $.each(data, function(index, item) {
            
            if (power === item.power 
                && brands.indexOf(item.brand) > -1
                && item.price <= maxPrice
                && item.price >= minPrice
            ) {
                var itemHtml = createItemHtml(item);
                $catalog.append(itemHtml);
            } 
            if (power === 'any'
                && brands.indexOf(item.brand) > -1
                && item.price <= maxPrice
                && item.price >= minPrice
            ) {
                var itemHtml = createItemHtml(item);
                $catalog.append(itemHtml);
            }
        });
    }).fail(function() { 
        alert('Ошибка загрузки!'); 
    });
});

// Cортировка товаров

var $filterPrice = $('.filter-price');
var $filterNew = $('.filter-new');
var $filterSale = $('.filter-sale');

function sortItemsByPrice(array) {
    array.sort(function (min, max) {
        return min.price - max.price;
    });
};

$filterPrice.on('click', function(event) {
    event.preventDefault;

    $(this).addClass('active')
            .siblings('a')
            .removeClass('active');
    
    $catalog.empty();
    
    $.getJSON(dataUrl).done(function(data) {
        var power = $('input[type=radio]:checked').val();
        var maxPrice = $maxPrice.val();
        var minPrice = $minPrice.val();

        var $checkedBrands = $('input[type=checkbox]:checked');

        var brands = $.map($checkedBrands, function(element) {
            return element.value; 
        });

        sortItemsByPrice(data);

        $.each(data, function(index, item) {
            if (power === item.power 
                && brands.indexOf(item.brand) > -1
                && item.price <= maxPrice
                && item.price >= minPrice
            ) {
                var itemHtml = createItemHtml(item);
                $catalog.append(itemHtml);
            } 
            if (power === 'any'
                && brands.indexOf(item.brand) > -1
                && item.price <= maxPrice
                && item.price >= minPrice
            ) {
                var itemHtml = createItemHtml(item);
                $catalog.append(itemHtml);
            }
        });
    }).fail(function() { 
        alert('Ошибка загрузки!'); 
    })
});
