let baseUrl = "http://127.0.0.1:8080/ch";

define(['jquery', 'md5', 'cookie'], function($, md5, cookie) {
    return {
        // 提交登入数据
        resEn: function() {
            $('.userEnter').on('click', function() {
                // cookie.remove('enter');
                $.ajax({
                    type: "post",
                    url: `${baseUrl}/lib/userEnter.php`,
                    data: {
                        userphone: $('#ph').val(),
                        userpass: $.md5($('#pass').val())
                    },
                    success: function(res) {
                        var arr = res.split('');
                        // console.log(arr);
                        if (arr.length <= 9) {
                            alert(res);
                        } else {
                            console.log(res);
                            $('body').append(res);
                            $('#zt').append('<a href="enter.html" >已登入</a>')
                            cookie.set('enter', '[{"success":"true"}]', 1);
                        };


                    }
                });
            });

        },
        // 选择登入方式
        enWay: function() {
            $('.top-title>div>a').on('click', function() {
                $(this).addClass('active').siblings().removeClass('active');
                $(this).text()
                if ($(this).text() == '手机短信登入') {

                    $('.top-right').css('display', 'inline-block');
                    $('.top-left').css('display', 'none');
                } else {
                    $('.top-right').css('display', 'none');
                    $('.top-left').css('display', 'inline-block');
                }
            })
        }
    }
})