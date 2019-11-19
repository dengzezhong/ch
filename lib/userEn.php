<?php
    
    // 流程思路：
    // 1,连接数据库；
    // 2，接收用户提交的数据；
    // 3，验证数据；(主要验证用户名在数据库中国是否存在)
    // 4，根据验证结果进行操作：提交/提示；

    include('./conn.php');

    $userphone=$_REQUEST['userphone'];
    $userpass=$_REQUEST['userpass'];
    $repass=$_REQUEST['repass'];
    $yzm=$_REQUEST['yzm'];
    $useryzm=$_REQUEST['useryzm'];
   
    
    $sql="select * from user where user_phone=$userphone";
 
    $result=$mysqli->query($sql);

    

    if($result->num_rows>0){
        // echo $result->num_rows;
        echo '用户已存在！';
        $mysqli->close();
        die;
    }else{
        $insertsql="insert into `user`(`user_phone`,`user_pass`,`re_pass`,`yzm`,`user_yzm`) values($userphone,'$userpass','$repass','$yzm',$useryzm);";

        $res=$mysqli->query($insertsql);
        if($res){
        echo '<script>location.href="http://127.0.0.1:8080/ch/src/html/enter.html";</script>';
        };
    };

    $mysqli->close();
?>