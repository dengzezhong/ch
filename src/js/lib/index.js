let baseUrl = "http://127.0.0.1:8080/ch";

define(['jquery'], function($) {
    return {
        // 首页——渲染页面功能
        render: function() {
            $.ajax({
                type: "get",
                url: `${baseUrl}/lib/getdata.php`,
                dataType: "json",
                success: function(res) {
                    let temp = '';
                    res.forEach(elm => {
                        temp += `<div>
                        <a href="${baseUrl}/src/html/details.html?id=${elm.id}"><img src="${baseUrl}/src/img/T-${elm.id}.jpg" alt=""></a>
                        <br>
                        <a href="${baseUrl}/src/html/details.html?id=${elm.id}" title="${elm.title}">${elm.title}</a>
                        <p>开机物联电视 关机智能音箱</p>
                        <span> ￥ ${elm.price}</span>
                      </div>`;
                    });
                    $('.text-bot-temp').append(temp);
                }
            });
        },

        // 左边固定导航，跟踪效果(页面滚动跟踪++++单击导航跟踪)
        fixedNav: function() {

            $(window).on('scroll', function() {
                var scrollTop = $(window).scrollTop();

                if (scrollTop < 600 || scrollTop > 3437) {
                    $('.fixed-nav-left').css('display', 'none');
                } else {
                    $('.fixed-nav-left').css('display', 'inline-block');
                }
                if (scrollTop < 100) {
                    $('.fixed-nav-right-two').css('display', "none");

                } else {
                    $('.fixed-nav-right-two').css('display', 'inline-block');
                }

                // 页面滚动跟踪
                if (scrollTop > 560 && scrollTop < 810) {
                    $('.fixed-nav-left>span').eq(0).addClass('fixed-color').siblings().removeClass('fixed-color');
                } else if (scrollTop > 810 && scrollTop < 1500) {
                    $('.fixed-nav-left>span').eq(1).addClass('fixed-color').siblings().removeClass('fixed-color');
                } else if (scrollTop > 1500 && scrollTop < 2250) {
                    $('.fixed-nav-left>span').eq(2).addClass('fixed-color').siblings().removeClass('fixed-color');
                } else if (scrollTop > 2250 && scrollTop < 3000) {
                    $('.fixed-nav-left>span').eq(3).addClass('fixed-color').siblings().removeClass('fixed-color');
                } else if (scrollTop > 3000) {
                    $('.fixed-nav-left>span').eq(4).addClass('fixed-color').siblings().removeClass('fixed-color');
                }
            });
            // 单击导航跟踪
            $('.fixed-nav-left>span').on('click', function() {
                var docTop = $(document).scrollTop();

                var top = $('.' + $(this).attr('value')).offset().top;

                $('html,body').animate({ scrollTop: top }, 500);

                $(this).addClass('fixed-color').siblings().removeClass('fixed-color');

            })

        }
    }
})