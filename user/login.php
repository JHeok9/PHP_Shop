<?php
require_once "../common/dbconn.php";
header('Content-Type: application/json'); // 응답 헤더를 JSON 형식으로 설정

require_once "../lib/vendor/autoload.php";
require_once "../common/jwt.php";

// JSON 데이터 읽기
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// 로그인 데이터 필터
$filtered = array(
    'id' => mysqli_real_escape_string($conn, $data['id']),
    'password' => password_hash($data['password'], PASSWORD_DEFAULT)
);

// 로그인
try{
    $sql = "select * from user where id = '{$filtered['id']}'";
    // 로그인 시도
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result);

    if($row['id'] == $filtered['id']){ // 아이디 일치하는지
        if(password_verify($data['password'], $row['password'])){ // 비밀번호 일치하는지
            // 로그인 성공
            $response = array(
                'status' => 'success', 
                'message' => '로그인이 성공적으로 완료되었습니다.',
                'user_seq' => $row['seq'], // 회원번호를 응답에 포함
                'token' => createJWT($conn,$row['id'])
            );
            echo json_encode($response);
            exit();
        }else {
            throw new Exception('로그인에 실패했습니다: 비밀번호가 틀렸습니다.');
        }
    }else {
        throw new Exception('로그인에 실패했습니다: 존재하지않는 아이디입니다.');
    }
} catch(Exception $e){
    // 로그인 실패
    $response = array('status' => 'error', 'message' => $e->getMessage());
    echo json_encode($response);
    error_log($e->getMessage());
}
?>