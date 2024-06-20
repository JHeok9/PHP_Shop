<?php
require_once "../common/dbconn.php";
header('Content-Type: application/json'); // 응답 헤더를 JSON 형식으로 설정

// JSON 데이터 읽기
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$cart_seq = mysqli_real_escape_string($conn, $data['cart_id']);

$sql = "delete from cart where seq = $cart_seq";

try {
    $result = mysqli_query($conn, $sql);

    if ($result) {
        $response = array('status' => 'success');
        echo json_encode($response);
    } else {
        throw new Exception('삭제 실패');
    }
} catch (Exception $e) {
    $response = array('status' => 'error', 'message' => $e->getMessage());
    echo json_encode($response);
}
?>