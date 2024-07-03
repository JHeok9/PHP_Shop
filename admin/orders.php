<?php 
// SSE(Server Sent Events) 사용
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');

require_once "../common/dbconn.php";
// header('Content-Type: application/json'); // 응답 헤더를 JSON 형식으로 설정

while(true){
    $sql = "select o.seq, u.id, i.name, o.price, a.addr_num, a.addr, a.addr_detail, o.order_date, o.status
              from orders o left join user u
                on o.user_seq = u.seq left join order_detail od
                on o.seq = od.order_seq left join item i
                on od.item_seq = i.seq left join address a
                on o.addr_seq = a.seq
            order by o.order_date desc";
    
    $result = mysqli_query($conn,$sql);
    
    $orders = array();
    
    while($row = mysqli_fetch_assoc($result)){
        $orders[] = $row;
    }
    
    //echo json_encode($orders);
    
    $data =  json_encode($orders);

    echo "data: {$data}\n\n";
    ob_flush();
    flush();
    sleep(5); // 업데이트 주기(초)
}
?>