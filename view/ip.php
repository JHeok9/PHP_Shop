<?php
function getUserIP() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

require_once "../lib/vendor/autoload.php";

use ipinfo\ipinfo\IPinfo;

$access_token = '123456789abc'; // 실제 토큰으로 대체해야 합니다.
$client = new IPinfo($access_token);
$ip_address = getUserIP();
$details = $client->getDetails($ip_address);

echo "City: " . $details->city . "<br>";
echo "Location: " . $details->loc . "<br>";

?>