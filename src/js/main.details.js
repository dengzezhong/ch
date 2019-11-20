require.config({
    paths: {
        jquery: "./jquery.min",
        details: "./lib/details",
        cookie: "./lib/cookie"
    },
    shim: {}
})

require(['jquery', 'details', 'cookie'], function($, details) {

    details.render(function(id, price) {
        $('.addCar>span').on('click', function() {
            details.addCar(id, price, $('.shopNum').val());
        })

    });
    details.tabs();
    details.shops();
})