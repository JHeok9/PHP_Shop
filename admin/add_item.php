<?php 
require_once "../common/dbconn.php";
header('Content-Type: application/json'); // 응답 헤더를 JSON 형식으로 설정

$category_seq = mysqli_real_escape_string($conn, $_POST['category_seq']);
$name = mysqli_real_escape_string($conn, $_POST['name']);
$price = mysqli_real_escape_string($conn, $_POST['price']);
$sale = mysqli_real_escape_string($conn, $_POST['sale']);
$cnt = mysqli_real_escape_string($conn, $_POST['cnt']);

// 파일 업로드 처리
function img_url($img_file){
    if (isset($img_file) && $img_file["error"] == UPLOAD_ERR_OK) {
        $upload_dir = "../item_img/"; // 업로드 경로
        $max_file_size = 10 * 1024 * 1024; // 5MB

        // 업로드된 파일 정보 가져오기
        $file_name = $img_file["name"];
        $file_tmp_name = $img_file["tmp_name"];
        $file_size = $img_file["size"];

        // 파일 확장자 체크
        $allowed_extensions = ["jpg", "jpeg", "png", "gif"];
        $file_extension = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));

        if (in_array($file_extension, $allowed_extensions)) { // 확장자 체크
            // 파일 크기 체크
            if ($file_size <= $max_file_size) {
                // 새로운 파일 이름을 생성합니다.
                $new_file_name = uniqid() . "." . $file_extension;
                $upload_path = $upload_dir . $new_file_name;

                // 파일을 이동시킵니다.
                if (move_uploaded_file($file_tmp_name, $upload_path)) {
                    // 파일 권한 설정
                    chmod($upload_path, 0777);
                    return $new_file_name;
                } else {
                    throw new Exception("파일 업로드 실패.");
                }
            } else {
                throw new Exception("파일 크기가 너무 큽니다. 최대 파일 크기는 " . ($max_file_size / (1024 * 1024)) . "MB입니다.");
            }
        } else {
            throw new Exception("지원하지 않는 파일 형식입니다. jpg, jpeg, png, gif 파일만 허용됩니다.");
        }
    }
}
$img1 = $_FILES['img1'];
$img2 = $_FILES['img2'];

// 저장된 파일 이름
$img1_url = img_url($img1);
$img2_url = img_url($img2);

$sql = "INSERT INTO item (category_seq, name, price, sale, img1, img2, cnt) VALUES ($category_seq, '$name', '$price', '$sale', '$img1_url', '$img2_url', $cnt)";

if (mysqli_query($conn, $sql)) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'DB 오류: ' . mysqli_error($conn)]);
}
?>