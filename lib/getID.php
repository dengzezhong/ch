<?php
    include('./conn.php');

    $getid=$_REQUEST['id'];

    $sql="select * from ch_product where id=$getid";

    $res=$mysqli->query($sql);

    $id=$res->fetch_assoc();

    $json=json_encode($id);

    echo $json;

    $mysqli->close();
?>