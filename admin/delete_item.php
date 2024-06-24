<?php 
require_once "../common/dbconn.php";
header('Content-Type: application/json'); // 응답 헤더를 JSON 형식으로 설정

$seq = mysqli_real_escape_string($conn, $_POST['seq']);

// 파일 삭제 처리
try{
    $sql = "select * from item where seq = $seq";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);
    $img1 = $row['img1'];
    $img2 = $row['img2'];

    unlink("../item_img/".$img1);
    unlink("../item_img/".$img2);

    $sql = "update item set deleted = 'Y' where seq = $seq";

    if (mysqli_query($conn, $sql)) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'DB 오류: ' . mysqli_error($conn)]);
    }

}catch(Exception $e){
    echo json_encode(['status' => 'error', 'message' => '삭제 오류']);
}
?>