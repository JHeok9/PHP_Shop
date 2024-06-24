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
        <section class="products">
            <div class="product-list" id="product-list">
                <!-- Products will be dynamically inserted here -->
            </div>
        </section>
    </main>
<?php require_once "include/footer.php"; ?>