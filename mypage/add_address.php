<?php
require_once "../common/dbconn.php";
header('Content-Type: application/json'); // 응답 헤더를 JSON 형식으로 설정

// JSON 데이터 읽기
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$user_seq = $data['user_seq'];
$name = mysqli_real_escape_string($conn, $data['name']);
$addr_num = mysqli_real_escape_string($conn, $data['addr_num']);
$addr = mysqli_real_escape_string($conn, $data['addr']);
$addr_detail = mysqli_real_escape_string($conn, $data['addr_detail']);
$phone_number = mysqli_real_escape_string($conn, $data['phone_number']);

$sql = "INSERT INTO address (user_seq, name, addr_num, addr, addr_detail, phone_number)
        values($user_seq, '$name', '$addr_num', '$addr', '$addr_detail', '$phone_number')";

if(mysqli_query($conn,$sql)){
    echo json_encode(['status' => 'success' ]);
}else{
    echo json_encode(['status' => 'error' ]);
}
?>