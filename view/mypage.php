<?php
require_once "include/header.php";
?>
   <nav>
        <ul>
            <li><a href="#" id="show-profile">회원정보</a></li>
            <li><a href="#" id="show-orders">주문목록</a></li>
            <li><a href="#" id="show-addresses">배송지목록</a></li>
        </ul>
    </nav>
    <main>
        <div id="profile-container" class="content-container">
            <h2>회원정보</h2>
            <p id="user-id"></p>
            <p id="user-name"></p>
            <p id="user-phone_number"></p>
        </div>
        <div id="orders-container" class="content-container hidden">
            <h2>주문목록</h2>
            <div id="orders-list"></div>
        </div>
        <div id="addresses-container" class="content-container hidden">
            <h2>배송지목록</h2>
            <div id="addresses-list"></div>
        </div>
    </main>
<?php require_once "include/footer.php"; ?>