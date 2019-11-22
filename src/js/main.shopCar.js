require.config({
    paths: {
        jquery: "./jquery.min",
        shopCar: "./lib/shopCar",
        cookie: "./lib/cookie"
    },
    shim: {}

});

require(['jquery', 'shopCar', 'cookie'], function($, shopCar, cookie) {
    // cookie.remove('shop');
    shopCar.render();
    shopCar.selectShop(function() {

        shopCar.oneShop();
    });
    shopCar.deleteShop();
    shopCar.oneShop();
})