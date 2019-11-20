require.config({
    paths: {
        jquery: "./jquery.min",
        shopCar: "./lib/shopCar",
        cookie: "./lib/cookie"
    },
    shim: {}

});

require(['jquery', 'shopCar', 'cookie'], function($, shopCar, cookie) {
    shopCar.render(function() {

        shopCar.selectShop();

    });
})