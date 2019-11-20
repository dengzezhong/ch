define(['jquery', 'cookie'], function($, cookie) {
    return {
        render: function(callback) {

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
                            $('.mainCar>.wrapper').append(`
                                 <div>
                                    <input type="checkbox">
                                    <div>
                                        <img src="../img/T-${res.id}.jpg" alt="">
                                        <div>
                                            <h4>${res.title}</h4>
                                            <span>￥${res.price}</span>
                                            <span>${num[i]}件</span>
                                            <p class="glyphicon   glyphicon-trash"></p>
                                        </div>
                                    </div>
                                </div>
                                `);
                            callback && callback();
                        },

                    });
                });



            } else {
                $('.mainCar>.wrapper').append('<h2>购物车空空如也！</h2>');
            }
        },


        selectShop: function() {
            let shop = cookie.get('shop');
            let idArr = [];
            let price = [];
            let num = [];


            $('input').on('click', function() {
                var sum = 0;
                if (shop) {
                    JSON.parse(shop).forEach(elm => {
                        idArr.push(elm.id);
                        price.push(elm.price);
                        num.push(elm.num);
                    });
                    for (var i = 0; i < idArr.length; i++) {
                        sum += parseFloat(price[i] * num[i]);
                    }
                    console.log(sum);
                    if ($(this).attr('id') == 'all') {

                        $('input').attr('checked', 'checked').last().removeAttr('checked');
                        $('.price').text(`￥${sum}`);

                    }
                }
            })


        }
    }


})