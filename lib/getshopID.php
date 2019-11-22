<?php
    include('./conn.php');

    $idArr=$_REQUEST['idArr'];

    $sql="select * from ch_product where in ($idArr)";

    $res=$mysqli->query($sql);

    $arr=array();

    while($row=$res->fetch_assoc()){
        pust_array($arr,$row);
    }

    $json=json_encode();

    echo $json;

    $mysqli->close();
?>