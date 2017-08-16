var MAX_ITEMS = 9;
var $catalog = $('.items');
var RUB = ' &#8381';

$(function() {
    $.getJSON('data/items.json').done(function(data) {
        $.each(data, function(index, item) {
            if (item.new === true) {
                item.new = "new";
            } else {
                item.new = "";
            }
            
            $catalog.append(
                '<div class="item ' + item.new + '" id="' + item.title + '"><div class="actions"><a href="#" class="buy">Купить</a>' + 
                '<a href="#" class="bookmark">В закладки</a></div><div class="item-img">' +
                '<img src="' + item.image + '" alt="'+ item.title +'" width="218" height="168">' +
                '</div><p class="item-name"><span class="item-type">Перфоратор</span> ' + 
                '<span class="item-brand">' + item.brand + '</span> ' +
                '<span class="item-model">' + item.model + '</span>' +
                '</p><span class="old-price">' + item.oldPrice + RUB + '</span><br>' +
                '<span class="btn-price">' + item.price + RUB + '</span></div>' 
            );
        });

    }).fail(function() { 
        alert('Товары не найдены!'); 
    })
}); 

var $filterPrice = $('.filter-price');
var $filterType = $('.filter-price');
var $filterFunction = $('.filter-function');
var $filterBtn = $('.filter-btn');

$filterBtn.on('click', function(event) {
    event.preventDefault();
    $catalog.empty();
    
    $.getJSON('data/items.json').done(function(data) {
        var $brands = $('input[type=checkbox]:checked').val();
       
        if ($brands === undefined) {
            alert('Выберите марку товара!');
        }
     
        $.each(data, function(index, item) {
            var $brands = $('input[type=checkbox]:checked').val();
            var $power = $('input[type=radio]:checked').val();
            

            if (item.power === $power && item.brand === $brands) {
       
                if (item.new === true) {
                    item.new = "new";
                } else {
                    item.new = "";
                }

                $catalog.append(
                    '<div class="item ' + item.new + '" id="' + item.title + '"><div class="actions"><a href="#" class="buy">Купить</a>' + 
                    '<a href="#" class="bookmark">В закладки</a></div><div class="item-img">' +
                    '<img src="' + item.image + '" alt="'+ item.brand +'" width="218" height="168">' +
                    '</div><p class="item-name"><span class="item-type">Перфоратор</span> ' + 
                    '<span class="item-brand">' + item.brand + '</span> ' +
                    '<span class="item-model">' + item.model + '</span>' +
                    '</p><span class="old-price">' + item.oldPrice + RUB + '</span><br>' +
                    '<span class="btn-price">' + item.price + RUB + '</span></div>' 
                );
            } 
        });
    
    }).fail(function() { 
        alert('Ошибка загрузки! Измените запрос.'); 
    })
    
});