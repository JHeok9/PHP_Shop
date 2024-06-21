<?php
require_once "include/header.php";
?>
    <div id="order-container">
        <div id="user-info">
            <h2>사용자 정보</h2>
            <p id="user-name"></p>
            <p id="user-address"></p>
        </div>
        <div id="item-info">
            <h2>상품 정보</h2>
            <img style="width: 300px;" id="order-item-image" src="" alt="상품 이미지">
            <p id="item-name"></p>
            <p id="item-price"></p>
        </div>
        <button id="confirm-order">주문 확인</button>
    </div>
<?php require_once "include/footer.php"; ?>