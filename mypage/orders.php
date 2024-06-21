<?php
require_once "../common/dbconn.php";
header('Content-Type: application/json'); // 응답 헤더를 JSON 형식으로 설정

// JSON 데이터 읽기
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$user_seq = mysqli_real_escape_string($conn, $data['user_seq']);

$sql = "select i.name, o.order_date, o.price, o.status
          from orders o left join order_detail od 
            on o.seq = od.order_seq left join item i
            on od.item_seq = i.seq
         where o.user_seq = $user_seq
         order by o.order_date desc";

$result = mysqli_query($conn, $sql);

$orders = [];
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $orders[] = $row;
    }
    echo json_encode(['orders' => $orders]);
} else {
    echo json_encode(['error' => 'Failed to load orders']);
}
?>