<?php
require_once "include/header.php";
?>
   <main>
       <ul>
        <li>
            <a href="admin.php">주문현황</a>
        </li>
        <li>
            <a href="addItem.php">상품등록</a>
        </li>
        <li>
            <a href="modifyItemList.php">상품수정</a>
        </li>
    </ul>
        <div id="product-registration-container" class="content-container">
            <h2>주문 현황</h2>
            <table border="1">
                <colgroup>
                    <col width="5%">
                    <col width="10%">
                    <col width="20%">
                    <col width="10%">
                    <col width="30%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                </colgroup>
                <thead>
                    <th>주문번호</th>
                    <th>유저ID</th>
                    <th>상품명</th>
                    <th>주문금액</th>
                    <th>배송주소</th>
                    <th>주문날짜</th>
                    <th>주문현황</th>
                    <th>변경</th>
                </thead>
                <tbody id="admin-orders">
                    
                </tbody>
            </table>
        </div>
    </main>
<?php require_once "include/footer.php"; ?>