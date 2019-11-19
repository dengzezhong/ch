<?php
    include('./conn.php');

    $userphone=$_REQUEST['userphone'];
    $userpass=$_REQUEST['userpass'];

    $sql="select * from user where user_phone=$userphone and user_pass='$userpass'";

    $res=$mysqli->query($sql);

    if($res->num_rows>0){
        echo '<script>location.href="http://127.0.0.1:8080/ch/src/html/";</script>';
    }else{
        echo '手机号或密码错误！';
    };

    $mysqli->close();


?>