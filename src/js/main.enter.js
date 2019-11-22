require.config({
    paths: {
        jquery: "./jquery.min",
        enter: "./lib/enter",
        md5: "./jquery.md5",
        cookie: "./lib/cookie"
    },
    shim: {
        md5: ['jquery']
    }
});

require(['jquery', 'enter', 'md5', 'cookie'], function($, userEnter) {
    userEnter.resEn();
    userEnter.enWay();
})