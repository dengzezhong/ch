let baseUrl = "http://127.0.0.1:8080/ch";

define(['jquery', 'cookie'], function($, cookie) {
    return {
        // 详情页渲染页面
        render: function(callback) {
            let id = location.search.split('=')[1];
            $.ajax({
                type: "get",
                url: `${baseUrl}/lib/getID.php`,
                data: {
                    id: id
                },
                dataType: "json",
                success: function(res) {
                    $('.big').append(`<img src="../img/T-${res.id}.jpg" alt="">`);
                    $('.details-box>div').prepend(`
                            <ul>
                                <div>
                                    <p>${res.title}</p>
                                    <span>一级能效 节能好颜</span>
                                </div>
                                <a href="">加入对比</a>
                            </ul>
                            <ul>
                                <span>
                                    ￥${res.price}
                                </span>
                            </ul>
                    `);

                    callback && callback(res.id, res.price);
                }
            });


        },


        // 下菜单选项卡功能
        tabs: function() {
            $('.glyphicon-th-list').on('click', function() {

                $(this).toggleClass('gtl');
                $('.banner-nav').toggleClass('gtl-nav');

            })

            $('.details-pt>.wrapper>div>ul>span').on('click', function() {

                $(this).addClass('active').siblings().removeClass('active');
            })

            // 商品放大镜

        },

        // 加减商品数量功能

        shops: function() {
            $('.shoping>span').on('click', function() {
                var count = $(this).siblings().val();

                if ($(this).text() == '-') {
                    count--;
                    // console.log(count);
                } else {
                    count++;
                }

                $(this).siblings().val(count);
                if ($(this).siblings().val() < 1) {
                    count = 1;
                    $(this).siblings().val(count);
                } else if ($(this).siblings().val() > 12) {
                    count = 12;
                    $(this).siblings().val(count);
                }
            })
        },

        // 加入购物车（利用cookie记入数据,存入JSON字符串）
        addCar: function(id, price, num) {
            let shop = cookie.get('shop');

            let addPrice = price;
            // 将数据存放成一个对象，为一条完整的数据
            let shopData = {
                id: id,
                price: addPrice,
                num: num
            }

            // 有shop数据就进行修改操作，没有就进行添加操作
            if (shop) {
                shop = JSON.parse(shop);

                // 判断是否有相同数据，如果有就修改num的值
                if (shop.some(elm => elm.id == id)) {
                    shop.forEach(elm => {
                        elm.id == id ? elm.num = num : null;
                    })
                } else {
                    shop.push(shopData);
                }

            } else {
                shop = [];
                shop.push(shopData);
            }

            cookie.set('shop', JSON.stringify(shop), 1)

            $('body').append('<script>alert("已加入购物车")</script>');
        },

        // 用户是否登入注册
        userEnter: function() {
            let enter = cookie.get('enter');

            if (JSON.parse(enter)[0].success) {

                $('#zt').text('').append(' <a href="#">长虹</a><span>|</span><a href="#" target="_blank">欢迎您</a>');

                $('.enterShop').attr('href', 'shopCar.html');
            }
        }

    }
})