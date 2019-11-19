// 注册页入口文件

require.config({
    paths: { //模块和其路径
        jquery: "./jquery.min",
        md5: "./jquery.md5",
        enroll: "./lib/enroll"
    },
    shim: { //谁依赖-->谁
        md5: ['jquery']

    }
})

require(['jquery', 'enroll', 'md5'], function($, enr, md5) {

    enr.enrEV('.userEn');
})