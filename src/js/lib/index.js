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
                        <a href="details.html?id=${baseUrl}/src/html${elm.id}"><img src="${baseUrl}/src/img/T-${elm.id}.jpg" alt=""></a>
                        <br>
                        <a href="" title="${elm.title}">${elm.title}</a>
                        <p>开机物联电视 关机智能音箱</p>
                        <span>${elm.price}</span>
                      </div>`;
                    });
                    $('.text-bot-temp').append(temp);
                }
            });
        },

        // 左边固定导航，跟踪效果(页面滚动跟踪++++单击导航跟踪)
        fixedNav: function() {
            var docHeight = $(document).height();
            var bodyH = $(body).height();
            console.log(bodyH);
            // 单击导航跟踪
            $('.fixed-nav-left>a').on('click', function() {
                var count = $(this).attr('value');
                console.log(count);
                switch (count) {
                    case 1:
                        $(document).offset({ top: -100, left: 0 });
                }
            })



        }
    }
})