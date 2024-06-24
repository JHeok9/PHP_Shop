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
            <h2>상품 등록</h2>
            <form id="product-registration-form" enctype="multipart/form-data">
                <input id="seq" type="hidden" name="seq">
                <input id="old_img1" type="hidden" name="old_img1">
                <input id="old_img2" type="hidden" name="old_img2">
                <label for="product-category">카테고리:</label>
                <select id="category_seq" name="category_seq">
                    <option value="1">가전</option>
                    <option value="2">가구</option>
                    <option value="3">패션</option>
                </select>

                <label for="product-name">상품명:</label>
                <input id="name" type="text" name="name" required>

                <label for="product-price">가격:</label>
                <input id="price" type="number" name="price" required>

                <label for="product-price">할인율:</label>
                <input id="sale" type="number" name="sale" required>

                <label for="product-image">대표 이미지</label>
                <input id="img1" type="file" name="img1" required>

                <label for="product-image">설명 이미지</label>
                <input id="img2" type="file" name="img2" required>
                
                <label for="product-cnt">재고</label>
                <input id="cnt" type="number" name="cnt" required>
                
                <button type="submit">등록</button>
            </form>
            <button id="delete-item">삭제</button>
        </div>
    </main>
<?php require_once "include/footer.php"; ?>