<?php
// JWT 생성 함수
function createJWT($conn, $user_id) {
    $key = "123123keyeky123";
    $issuedAt = time();
    $accesccExpire = $issuedAt + 60;
    $refreshExpire = $issuedAt + 21600;

    $accesccPayload = [
        'iat' => $issuedAt,
        'exp' => $accesccExpire,
        'data' => [
            'user_id' => $user_id
        ],
        'type' => "access"
    ];

    $aceessToken = Firebase\JWT\JWT::encode($accesccPayload, $key, 'HS256');


    $refrehPayload = [
        'iat' => $issuedAt,
        'exp' => $refreshExpire,
        'data' => [
            'user_id' => $user_id
        ],
        'type' => 'refresh'
    ];

    $refreshToken = Firebase\JWT\JWT::encode($refrehPayload, $key, 'HS256');

    $cnt = 0;
    $check_cnt = 0;
    $check_sql = "SELECT seq FROM JWT WHERE user_id = ?";
    $stmt = $conn->prepare($check_sql);
    $stmt->bind_param("s", $user_id);
    $stmt->execute();
    $check_re = $stmt->get_result();
    $check_cnt = $check_re->num_rows;
    $stmt->close();

    if ($check_cnt == 0) {
        $sql = "INSERT INTO JWT (user_id, refresh_token, login_time) VALUE (?,?,now())";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $user_id, $refreshToken);
        $stmt->execute();
        $cnt = $stmt->affected_rows;
        $stmt->close();
    } else {
        $sql = "UPDATE JWT SET  refresh_token = ? , login_time = now() WHERE user_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss",  $refreshToken, $user_id);
        $stmt->execute();
        $cnt = $stmt->affected_rows;
        $stmt->close();
    }

    if ($cnt == 1) {
        $out = [
            'access' => $aceessToken,
            'refresh' => $refreshToken
        ];
    }

    return $out;
}
?>