<?php
require_once "../common/dbconn.php";
header('Content-Type: application/json'); // 응답 헤더를 JSON 형식으로 설정

// JSON 데이터 읽기
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// 회원가입 데이터 필터
$filtered = array(
    'id' => mysqli_real_escape_string($conn, $data['id']),
    'password' => password_hash($data['password'], PASSWORD_DEFAULT),
    'name' => mysqli_real_escape_string($conn, $data['name']),
    'nickname' => mysqli_real_escape_string($conn, $data['nickname']),
    'phone_number' => mysqli_real_escape_string($conn, $data['phone_number']),
    'addr_num' => mysqli_real_escape_string($conn, $data['addr_num']),
    'addr' => mysqli_real_escape_string($conn, $data['addr']),
    'addr_detail' => mysqli_real_escape_string($conn, $data['addr_detail'])
);

// 회원가입
try{
    $join_sql = "insert into user(id, password, name, nickname, phone_number) 
            values('{$filtered['id']}','{$filtered['password']}', '{$filtered['name']}', '{$filtered['nickname']}', '{$filtered['phone_number']}')";

    // 회원가입
    $join_result = mysqli_query($conn, $join_sql);
    if ($join_result === false) {
        throw new Exception('회원가입에 실패했습니다: ' . mysqli_error($conn));
    }

    // 회원번호 가져오기
    $join_seq = mysqli_insert_id($conn);

    // 주소등록
    $addr_sql = "insert into address(user_seq, name, addr_num, addr, addr_detail, phone_number)
                values('$join_seq', '{$filtered['name']}', '{$filtered['addr_num']}', '{$filtered['addr']}', '{$filtered['addr_detail']}', '{$filtered['phone_number']}')";

    $addr_result = mysqli_query($conn, $addr_sql);

    if($addr_result === false){
        throw new Exception('주소등록에 실패했습니다 : ' . mysqli_error($conn));
    }

    // 회원가입 성공
    $response = array('status' => 'success', 'message' => '회원가입이 성공적으로 완료되었습니다.');
    echo json_encode($response);
} catch(Exception $e){
    // 회원가입 실패
    $response = array('status' => 'error', 'message' => $e->getMessage());
    echo json_encode($response);
    error_log($e->getMessage());
}
?>