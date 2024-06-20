<?php
require_once "../common/dbconn.php";
header('Content-Type: application/json'); // 응답 헤더를 JSON 형식으로 설정

$sql = "select i.*, c.name as category_name from item i left join item_category c on i.category_seq = c.seq where deleted = 'N'";
$result = mysqli_query($conn, $sql);

// 아이템 리스트 선언
$items = array();

while($row = mysqli_fetch_assoc($result)){
    $item = array(
        'seq' => $row['seq'],
        'category_seq' => $row['category_seq'],
        'category_name' => $row['category_name'],
        'name' => $row['name'],
        'img1' => $row['img1'],
        'price' => $row['price'],
        'sale' => $row['sale'],
        'reg_date' => $row['reg_date'],
        'cnt' => $row['cnt']
    );
    $items[] = $item; // 리스트에 아이템 추가
}

echo json_encode($items); // JSON 응답 반환

?>