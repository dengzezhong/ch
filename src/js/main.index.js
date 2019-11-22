// 入口文件

require.config({
    paths: {
        jquery: "./jquery.min",
        index: "./lib/index",
        cookie: "./lib/cookie"
    },
    shim: {}
})

require(['jquery', 'index'], function($, index) {
    index.render();
    index.fixedNav();
    index.userEnter();
})