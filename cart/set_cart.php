<?php
require_once "../common/dbconn.php";
header('Content-Type: application/json'); // 응답 헤더를 JSON 형식으로 설정

$user_seq = mysqli_real_escape_string($conn, $_GET['user']);
$item_seq = mysqli_real_escape_string($conn, $_GET['item']);

$sql = "insert into cart (user_seq, item_seq) values($user_seq, $item_seq)";

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