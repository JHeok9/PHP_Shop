<?php
require_once "../common/dbconn.php";
header('Content-Type: application/json'); // 응답 헤더를 JSON 형식으로 설정

// JSON 데이터 읽기
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$sql = "insert into cart (user_seq, item_seq) values({$data['user_id']}, {$data['item_id']})";

try{
    $result = mysqli_query($conn, $sql);

    if($result){
        $response = array('status' => 'success');
    }else{
        throw new Exception('Database insertion failed');
    }
}catch(Exception $e){
    $response = array('status' => 'error', 'message' => $e->getMessage());
}
echo json_encode($response);
?>