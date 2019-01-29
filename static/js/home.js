/*
 * JavaScript file for the application to demonstrate
 * using the API
 */

// Create the namespace instance
let ns = {};

// Create the model instance
ns.model = (function() {
    'use strict';

    let $event_pump = $('body');

    // Return the API
    return {
        'read': function() {
            let ajax_options = {
                type: 'GET',
                url: 'api/menu',
                accepts: 'application/json',
                dataType: 'json'
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_read_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        },
        update: function(count) {
            let ajax_options = {
                type: 'PUT',
                url: 'api/menu/' + price,
                accepts: 'application/json',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    'count': count
                })
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_update_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        }
    };
}());

// Create the view instance
ns.view = (function() {
    'use strict';

    let $meal = $('#meal'),
        $price = $('#price'),
        $count = $('#count');

    // return the API
    return {
        update_editor: function(meal, price, count) {
            $price.val(price);
            $count.val(count);
            $meal.val(meal).focus();
        },
        build_table: function(menu) {
            let rows = ''

            // clear the table
            $('.menu table > tbody').empty();

            // did we get a menu array?
            if (menu) {
                for (let i=0, l=menu.length; i < l; i++) {
                    rows += `<tr><td class="selection"><input type="radio" class="custom-control-input"></td><td class="meal">${menu[i].meal}</td><td class="price">${menu[i].price}</td><td>${menu[i].timestamp}</td><td>${menu[i].count}</td></tr>`;
                }
                $('table > tbody').append(rows);
            }
        },
        error: function(error_msg) {
            $('.error')
                .text(error_msg)
                .css('visibility', 'visible');
            setTimeout(function() {
                $('.error').css('visibility', 'hidden');
            }, 3000)
        }
    };
}());

// Create the controller
ns.controller = (function(m, v) {
    'use strict';

    let model = m,
        view = v,
        $event_pump = $('body'),
        $meal = $('#meal'),
        $price = $('#price')
        $count = $('#count');

    // Get the data from the model after the controller is done initializing
    setTimeout(function() {
        model.read();
    }, 100)

    // Create our event handlers
    /* $('#create').click(function(e) {
        let meal = $meal.val(),
            price = $price.val();

        e.preventDefault();

        if (validate(meal, price)) {
            model.create(meal, price)
        } else {
            alert('Problem with first or last name input');
        }
    });

    $('table > tbody').on('dblclick', 'tr', function(e) {
        let $target = $(e.target),
            meal,
            price;

        meal = $target
            .parent()
            .find('td.meal')
            .text();

        price = $target
            .parent()
            .find('td.price')
            .text();

        view.update_editor(meal, price);
    }); */

    // Handle the model events
    $event_pump.on('model_create_success', function(e, data) {
        model.read();
    });

    $event_pump.on('model_update_success', function(e, data) {
        model.read();
    });

    $event_pump.on('model_error', function(e, xhr, textStatus, errorThrown) {
        let error_msg = textStatus + ': ' + errorThrown + ' - ' + xhr.responseJSON.detail;
        view.error(error_msg);
        console.log(error_msg);
    })
}(ns.model, ns.view));
