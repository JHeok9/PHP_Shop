<?php 
require_once "../common/dbconn.php";
header('Content-Type: application/json'); // 응답 헤더를 JSON 형식으로 설정

// JSON 데이터 읽기
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$order_seq = mysqli_real_escape_string($conn, $data['order_seq']);
$status = mysqli_real_escape_string($conn, $data['status']);

$sql = "update orders set status = '$status' where seq = $order_seq";

if (mysqli_query($conn, $sql)) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'DB 오류: ' . mysqli_error($conn)]);
}
?>