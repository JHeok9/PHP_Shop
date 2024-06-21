<?php
require_once "../common/dbconn.php";
header('Content-Type: application/json'); // 응답 헤더를 JSON 형식으로 설정

// JSON 데이터 읽기
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$user_seq = mysqli_real_escape_string($conn, $data['user_seq']);
$addr_seq = mysqli_real_escape_string($conn, $data['addr_seq']);
$item_seq = mysqli_real_escape_string($conn, $data['item_seq']);
$price = mysqli_real_escape_string($conn, $data['price']);

try {
    // 주문 테이블에 데이터 삽입
    $order_sql = "INSERT INTO orders (user_seq, addr_seq, price) VALUES ('$user_seq', '$addr_seq', '$price')";
    $order_result = mysqli_query($conn, $order_sql);
    if (!$order_result) {
        throw new Exception(mysqli_error($conn));
    }

    // 방금 삽입된 주문의 고유번호 가져오기
    $order_seq = mysqli_insert_id($conn);

    // 주문 상세 테이블에 데이터 삽입
    $order_detail_sql = "INSERT INTO order_detail (order_seq, item_seq, price, cnt) VALUES ('$order_seq', '$item_seq', '$price', 1)";
    $order_result2 = mysqli_query($conn, $order_detail_sql);
    if (!$order_result2) {
        throw new Exception(mysqli_error($conn));
    }

    echo json_encode(['status' => 'success']);
} catch (Exception $e) {
    // 트랜잭션 롤백
    mysqli_rollback($conn);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>