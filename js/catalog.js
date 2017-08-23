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

/**
 * Проверяет, что число входит в диапазон
 * 
 * @param {Number} number 
 * @param {Number} start 
 * @param {Number} end 
 *
 * @returns {Boolean}
 */
function inRange(number, start, end) {
    return number >= start && number <= end;
}

// Стартовая загрузка товаров 

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

/**
 * Выделяет активную кнопку сортировки
 */
function highlightSortButton($sortButton) {
    $sortButton
        .closest('ul')
        .find('a')
        .removeClass('active');

    $sortButton.addClass('active');
}

/**
 * Сотрировка товаров по цене
 */
function sortItemsByPriceMin(array) {
    array.sort(function (min, max) {
        return min.price - max.price;
    });
};

function sortItemsByPriceMax(array) {
    array.sort(function (min, max) {
        return max.price - min.price;
    });
};

// Фильтр

var $filterBtn = $('.filter-btn');
var $minPrice = $('#min-price');
var $maxPrice = $('#max-price');

$filterBtn.on('click', function(event) {
    event.preventDefault();
    
    if ($filterReset.hasClass('active')) {
        $filterReset.removeClass('active');
    }

    $.getJSON(dataUrl).done(function(data) {
        var power = $('input[type=radio]:checked').val();
        var maxPrice = $maxPrice.val();
        var minPrice = $minPrice.val();

        var $checkedBrands = $('input[type=checkbox]:checked');
        
        var brands = $.map($checkedBrands, function(element) {
            return element.value; 
        });
       
        $catalog.empty();

        if ($filterMinPrice.hasClass('active')) {
            sortItemsByPriceMin(data);
        }

        if ($filterMaxPrice.hasClass('active')) {
            sortItemsByPriceMax(data);
        }

        $.each(data, function(index, item) {
            if ([item.power, 'any'].indexOf(power) > -1
                && brands.indexOf(item.brand) > -1
                && inRange(item.price, minPrice, maxPrice)
            ) {
                var itemHtml = createItemHtml(item);
                $catalog.append(itemHtml);
            }
            if ($filterNew.hasClass('active')) {
                $catalog.find('.item').not('.new').remove();
            }
        });
    }).fail(function() { 
        alert('Ошибка загрузки!'); 
    })
});

var $filterMinPrice = $('.filter-min');
var $filterMaxPrice = $('.filter-max');
var $filterNew = $('.filter-new');
var $filterReset = $('.filter-reset');
var $filterNav = $('.products-filter-nav');

/**
 * Загрузка товаров в соответствии с настройками сортировки
 */
function onClickFilter(event) {
    event.preventDefault;

    var $this = $(this);

    highlightSortButton($this);
    
    $.getJSON(dataUrl).done(function(data) {
        var power = $('input[type=radio]:checked').val();
        var maxPrice = $maxPrice.val();
        var minPrice = $minPrice.val();

        var $checkedBrands = $('input[type=checkbox]:checked');

        var brands = $.map($checkedBrands, function(element) {
            return element.value; 
        });

        $catalog.empty();

        if ($this.hasClass('filter-max')) {
            sortItemsByPriceMax(data);
        } else {
            sortItemsByPriceMin(data);
        }

        $.each(data, function(index, item) {
            if ([item.power, 'any'].indexOf(power) > -1
                && brands.indexOf(item.brand) > -1
                && inRange(item.price, minPrice, maxPrice)
            ) {
                var itemHtml = createItemHtml(item);
                $catalog.append(itemHtml);
            }
        });
    }).fail(function() { 
        alert('Ошибка загрузки!'); 
    })
}

$filterMinPrice.on('click', onClickFilter);
$filterMaxPrice.on('click', onClickFilter);

// Загрузка только товаров-новинок

$filterNew.on('click', function(event) {
    event.preventDefault;

    var $this = $(this);

    highlightSortButton($this);
    
    $.getJSON(dataUrl).done(function(data) {
        var power = $('input[type=radio]:checked').val();
        var maxPrice = $maxPrice.val();
        var minPrice = $minPrice.val();

        var $checkedBrands = $('input[type=checkbox]:checked');

        var brands = $.map($checkedBrands, function(element) {
            return element.value; 
        });
        
        $catalog.empty();

        $.each(data, function(index, item) {
            if ([item.power, 'any'].indexOf(power) > -1
                && brands.indexOf(item.brand) > -1
                && inRange(item.price, minPrice, maxPrice)
                && item.new === true
            ) {
                var itemHtml = createItemHtml(item);
                $catalog.append(itemHtml);
            }
        });
    }).fail(function() { 
        alert('Ошибка загрузки!'); 
    })
});

// Сброс настроек фильтра

$filterReset.on('click', function(event) {
    event.preventDefault;

    highlightSortButton($(this));

    $.getJSON(dataUrl).done(function(data) {
        $catalog.empty();
        $.each(data, function(index, item) {
            var itemHtml = createItemHtml(item);
            $catalog.append(itemHtml);
        });
    }).fail(function() { 
        alert('Ошибка загрузки!'); 
    })
});
