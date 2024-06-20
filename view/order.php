<?php
require_once "include/header.php";
?>
   <main class="purchase-container">
        <section class="product-details">
            <h2>상품 상세 정보</h2>
            <div id="item-images" class="item-images"></div>
            <div id="item-info" class="item-info"></div>
        </section>

        <section class="purchase-form">
            <h2>구매 정보 입력</h2>
            <form id="purchaseForm" action="../checkout/process_purchase.php" method="POST">
                <input type="hidden" id="itemId" name="item_id">
                <label for="quantity">수량:</label>
                <input type="number" id="quantity" name="quantity" min="1" required>
                <button type="submit">구매하기</button>
            </form>
        </section>
    </main>
<?php require_once "include/footer.php"; ?>