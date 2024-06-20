<?php
require_once "../common/dbconn.php";
header('Content-Type: application/json'); // 응답 헤더를 JSON 형식으로 설정

$user_seq = mysqli_real_escape_string($conn, $_GET['user']);

$sql = "select i.* from cart c left join item i on c.item_seq = i.seq where c.user_seq = $user_seq";

try{
    $result = mysqli_query($conn, $sql);
    $cart_list = array();
    while($row = mysqli_fetch_assoc($result)){
        $item = array(
            'seq' => $row['seq'],
            'name' => $row['name'],
            'img1' => $row['img1'],
            'price' => $row['price'],
            'sale' => $row['sale'],
            'reg_date' => $row['reg_date']
        );
        $cart_list[] = $item; // 리스트에 아이템 추가
    }
    echo json_encode($cart_list); // JSON 응답 반환    
}catch(Exception $e){
    $response = array('status' => 'error', 'message' => $e->getMessage());
}
?>