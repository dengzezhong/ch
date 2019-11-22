define(['jquery', 'md5'], function($, md5) {
    return {
        // 注册
        enrEV: function(selector) {

            $(selector).on('click', function() {

                // location.href = "http://127.0.0.1:8080/ch/src/html/";
                // console.log($.md5($('#pass').val()));
                var obj = $('input').not('.userEn');
                var arr = Array.from(obj);

                var res = [];
                var count = 0;
                arr.forEach(elm => {
                    res.push($(`#${elm.id}`).val());
                });
                for (var j = 0; j <= res.length; j++) {
                    if (!res[j]) {
                        count++;
                        $('input').eq(j).not('.userEn').css('border', '1px solid red');
                    } else {
                        $('input').eq(j).css('border', 'none');
                    }
                };
                if ($('input').eq(1).val() == $('input').eq(2).val()) {
                    if (count == 1) {
                        $.ajax({
                            type: "post",
                            url: "http://127.0.0.1:8080/ch/lib/userEn.php",
                            data: {
                                userphone: $('#ph').val(),
                                userpass: $.md5($('#pass').val()),
                                repass: $.md5($('#repass').val()),
                                yzm: $('#yzm').val(),
                                useryzm: $('#dx').val()
                            },
                            success: function(res) {

                                var arr = res.split('');
                                if (arr.length <= 6) {
                                    alert(res);
                                } else {
                                    $('body').append(res);
                                };
                            }
                        });
                    };
                } else {
                    $('input').eq(1).css('border', '1px solid red');
                    $('input').eq(2).css('border', '1px solid red');
                    alert('密码不一样，请重新设置！！！')
                }

            })
        }
    }
})