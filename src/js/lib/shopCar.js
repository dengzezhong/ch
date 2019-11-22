define(['jquery', 'cookie'], function($, cookie) {
    return {
        // 渲染页面
        render: function() {

            let shop = cookie.get('shop');
            let idArr = [];
            let price = [];
            let num = [];

            // console.log(shop);//为json字符串
            // console.log(JSON.parse(shop));为数组，其元素为对象
            if (shop) {
                JSON.parse(shop).forEach(elm => {
                    idArr.push(elm.id);
                    price.push(elm.price);
                    num.push(elm.num);
                });


                idArr.forEach((id, i) => {
                    $.ajax({
                        type: "post",
                        url: "http://127.0.0.1:8080/ch/lib/getID.php",
                        data: {
                            id: id
                        },
                        dataType: "json",
                        success: function(res) {
                            $('.mainCar>.wrapper>.shopBox').prepend(`
                                 <div>
                                    <input type="checkbox" value="${res.id}">
                                    <div>
                                        <img src="../img/T-${res.id}.jpg" alt="">
                                        <div title="${res.id}">
                                            <h4>${res.title}</h4>
                                            <span >￥${res.price}</span>
                                            <span >${num[i]}件</span>
                                            <p   class="glyphicon   glyphicon-trash" ></p>
                                        </div>
                                    </div>
                                </div>
                                `);
                        },

                    });
                });

            } else {
                $('.mainCar>.wrapper').append('<h2>购物车空空如也！</h2>');
            }

        },

        // 全选 清空 商品
        selectShop: function(callback) {
            let shop = cookie.get('shop');


            let sum = 0;
            $('body').on('click', 'input', function() {

                if (shop) {
                    let idArr = [];
                    let price = [];
                    let num = [];
                    JSON.parse(shop).forEach(elm => {
                        idArr.push(elm.id);
                        price.push(elm.price);
                        num.push(elm.num);
                    });
                    $(this).toggleClass('tog');
                    // 全选商品
                    if ($(this).attr('id') == 'all') {


                        if ($(this).attr('class') == 'tog') {
                            for (var i = 0; i < idArr.length; i++) {
                                sum += price[i] * num[i];
                            }
                            $('input').attr('checked', 'checked').last().removeAttr('checked');
                            $('.price').text(`￥${sum.toFixed(2)}`);
                            sum = 0;
                            num = [];
                        } else {
                            $('input').removeAttr('checked');
                            $('.price').text(`￥00.00`);
                            num = [];
                        }

                    } else if ($(this).attr('id') == 'del') { //清空商品
                        sum = 0;
                        $('#all').removeAttr('checked');
                        $('input').removeAttr('checked').removeClass('tog');
                        $('.price').text(`￥00.00`);

                    }
                    // if ($(this).val() && $(this).attr('class') = 'tog') {
                    //     let j = 0; //用于接受索引
                    //     // console.log($(this).val());
                    //     idArr.forEach((elm, i) => {
                    //         if ($(this).val() == elm) {
                    //             j = i;
                    //             return;
                    //         }
                    //     })
                    //     sum -= price[j] * num[j];
                    //     $('.price').text(`￥${sum.toFixed(2)}`);
                    // }

                }
                callback && callback(sum);

            })



        },
        // 单独操作商品
        oneShop: function() {
            let idArr = [];
            let price = [];
            let num = [];
            let ne = $('.price').text().split('￥');
            // console.log(ne[1]);
            $('.shopBox').on('click', 'input', function() {
                // if (parseFloat(ne[1]) > 0) { //有勾选产品，进行修改产品
                let shop = cookie.get('shop');
                if (shop) {

                    JSON.parse(shop).forEach(elm => {
                        idArr.push(elm.id);
                        price.push(elm.price);
                        num.push(elm.num);
                    });
                    let j = 0; //用于接受索引
                    idArr.forEach((elm, i) => {
                        if ($(this).val() == elm) {
                            j = i;
                            return;
                        }
                    })
                    if ($(this).attr('class')) {
                        ne[1] = ne[1] + Math.abs(price[j] * num[j]);

                        $('.price').text(`￥${ne[1].toFixed(2)}`);
                    } else {
                        ne[1] = Math.abs(ne[1]) - Math.abs(price[j] * num[j]);

                        $('.price').text(`￥${ne[1].toFixed(2)}`);
                    }
                    if (ne[1] <= 0) {
                        console.log(Math.abs(ne[1]));

                        if (!Math.abs(ne[1])) {
                            $('.price').text(`￥00.00`);
                        } else {
                            $('.price').text(`￥${Math.abs(ne[1]).toFixed(2)}`);
                        }

                    }
                    $('#del').on('click', function() {

                            ne[1] = 0;

                        })
                        // if (ne[1] == 0) {
                        //     console.log(000);
                        //     ne[1] = ne[1] + price[j] * num[j];
                        //     console.log(price[j] * num[j]);
                        //     $('.price').text(`￥${Math.abs(ne[1].toFixed(2))}`);
                        // }
                        // }
                        //  else { //没有勾选产品，进行添加产品 ne[1]<=0

                    //     console.log(ne[1])
                    //     let shop = cookie.get('shop');
                    //     JSON.parse(shop).forEach(elm => {
                    //         idArr.push(elm.id);
                    //         price.push(elm.price);
                    //         num.push(elm.num);
                    //     });
                    //     let j = $(this).val();
                    //     console.log(j);

                    // }
                }
            })
        },

        // 删除商品
        deleteShop: function() {
            let shop = cookie.get('shop');
            $(".shopBox").on('click', '.glyphicon-trash', function() {

                let j = $(this).parent().attr('title');

                if (shop) {
                    let arr = [];
                    // console.log(arr);
                    JSON.parse(shop).forEach(elm => {
                        if (!(elm.id == j)) {
                            arr.push(elm);
                        }
                    });
                    // console.log(JSON.stringify(arr));
                    cookie.set('shop', JSON.stringify(arr), 1);
                    location.href = 'http://127.0.0.1:8080/ch/src/html/shopCar.html';


                }
            })
            if (shop == '[]') {
                $('.mainCar>.wrapper').append('<h2>购物车空空如也！</h2>');
            }
        }
    }
})