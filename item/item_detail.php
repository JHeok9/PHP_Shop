<?php
require_once "../common/dbconn.php";
header('Content-Type: application/json'); // 응답 헤더를 JSON 형식으로 설정

$item_seq = mysqli_real_escape_string($conn, $_GET['id']);

$sql = "select * from item where seq = $item_seq";
$result = mysqli_query($conn, $sql);

$row = mysqli_fetch_assoc($result);
$item = array(
    'seq' => $row['seq'],
    'category_seq' => $row['category_seq'],
    'name' => $row['name'],
    'img1' => $row['img1'],
    'img2' => $row['img2'],
    'img3' => $row['img3'],
    'img4' => $row['img4'],
    'img5' => $row['img5'],
    'price' => $row['price'],
    'sale' => $row['sale'],
    'reg_date' => $row['reg_date'],
    'cnt' => $row['cnt']
);

echo json_encode($item); // JSON 응답 반환

?>