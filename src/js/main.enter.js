require.config({
    paths: {
        jquery: "./jquery.min",
        enter: "./lib/enter",
        md5: "./jquery.md5"
    },
    shim: {
        md5: ['jquery']
    }
});

require(['jquery', 'enter', 'md5'], function($, userEnter) {
    userEnter.resEn();
    userEnter.enWay();
})