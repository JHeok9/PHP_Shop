<?php
require_once "../common/dbconn.php";
header('Content-Type: application/json'); // 응답 헤더를 JSON 형식으로 설정

// JSON 데이터 읽기
$input = file_get_contents('php://input');
$data = json_decode($input, true);

echo "json 데이타".$data['id'];

// 로그인 데이터 필터
$filtered = array(
    'id' => mysqli_real_escape_string($conn, $data['id']),
    'password' => password_hash($data['password'], PASSWORD_DEFAULT)
);

// 로그인
try{
    $sql = "select * from user where id = '{$filtered['id']}' and password = '{$filtered['password']}'";
    // 로그인 시도
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result);
    if(!empty($data['id']) && $row['id'] == $filtered['id'] && $row['password'] == $filtered['password']){
        // 로그인 성공
        $_SESSION['user_id'] = $row['seq']; // 세션에 유저 ID 저장
    }else{
        throw new Exception('로그인에 실패했습니다: ' . mysqli_error($conn));
    }
    // 로그인성공
    $response = array('status' => 'success', 'message' => '회원가입이 성공적으로 완료되었습니다.');
    echo json_encode($response);
} catch(Exception $e){
    // 로그인 실패
    $response = array('status' => 'error', 'message' => $e->getMessage());
    echo json_encode($response);
    error_log($e->getMessage());
}
?>