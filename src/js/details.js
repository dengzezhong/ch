$(function () {
    $('.glyphicon-th-list').on('click', function () {

        $(this).toggleClass('gtl');
        $('.banner-nav').toggleClass('gtl-nav');

    })

    $('.details-pt>.wrapper>div>ul>span').on('click',function(){
       
        $(this).addClass('active').siblings().removeClass('active');
    })

    // 商品放大镜
    
})