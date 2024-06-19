<?php
session_start();
require_once "../common/log.php";
// DB연결
$conn = mysqli_connect("localhost", "testlink", "12345", "test1");

// 로그인 데이터 필터
$filtered = array(
    'id' => mysqli_real_escape_string($conn, $_POST['id']),
    'password' => mysqli_real_escape_string($conn, $_POST['password'])
);

// 로그인
try{
    $sql = "select * from user where id = '{$filtered['id']}' and password = '{$filtered['password']}'";
    // 로그인 시도
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result);
    if(!empty($_POST['name']) && $row['name'] == $filtered['name'] && $row['password'] == $filtered['password']){
        // 로그인 성공
        $_SESSION['user_id'] = $row['id']; // 세션에 유저 ID 저장
        login_log($row['id']);
        header("Location: ../home.php");
        exit();
    }else{
        throw new Exception('로그인에 실패했습니다: ' . mysqli_error($conn));
    }
} catch(Exception $e){
    // 로그인 실패
    echo '로그인 실패: ' . $e->getMessage();
    error_log($e->getMessage());
}
?>