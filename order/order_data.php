<?php
require_once "../common/dbconn.php";
header('Content-Type: application/json'); // 응답 헤더를 JSON 형식으로 설정

// JSON 데이터 읽기
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$user_seq = $data['user_seq'];
$item_seq = $data['item_seq'];

$address_sql = "select * from address where user_seq = $user_seq";
$item_sql = "select * from item where seq = $item_seq";

$address_result = mysqli_query($conn,$address_sql);
$item_result = mysqli_query($conn, $item_sql);

// 결과 배열 초기화
$response = array(
    'status' => 'error',
    'address' => null,
    'item' => null
);

if ($address_result && mysqli_num_rows($address_result) > 0) {
    $response['address'] = mysqli_fetch_assoc($address_result);
}

if ($item_result && mysqli_num_rows($item_result) > 0) {
    $response['item'] = mysqli_fetch_assoc($item_result);
}

if ($response['address'] && $response['item']) {
    $response['status'] = 'success';
}

// JSON 응답 반환
echo json_encode($response);
?>