<?php
require_once "../common/dbconn.php";
header('Content-Type: application/json'); // 응답 헤더를 JSON 형식으로 설정

// JSON 데이터 읽기
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$user_seq = mysqli_real_escape_string($conn, $data['user_seq']);
$item_seq = mysqli_real_escape_string($conn, $data['item_seq']);

$address_sql = "select * from address where user_seq = $user_seq";
$item_sql = "select * from item where seq = $item_seq";

$address = mysqli_query($conn,$address_sql);
$item = mysqli_query($conn, $item_sql);






?>