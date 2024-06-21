<?php
require_once "../common/dbconn.php";
header('Content-Type: application/json'); // 응답 헤더를 JSON 형식으로 설정

// JSON 데이터 읽기
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$user_seq = mysqli_real_escape_string($conn, $data['user_seq']);

$sql = "SELECT * FROM address WHERE user_seq = $user_seq";
$result = mysqli_query($conn, $sql);

$addresses = [];
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $addresses[] = $row;
    }
    echo json_encode(['addresses' => $addresses]);
} else {
    echo json_encode(['error' => 'Failed to load addresses']);
}
?>