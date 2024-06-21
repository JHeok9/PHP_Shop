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
            <a href="modifyItem.php">상품수정</a>
        </li>
    </ul>
        <div id="product-registration-container" class="content-container">
            <h2>상품 등록</h2>
            <form id="product-registration-form" enctype="multipart/form-data">
                <label for="product-category">카테고리:</label>
                <select name="category_seq">
                    <option value="1">가전</option>
                    <option value="2">가구</option>
                    <option value="3">패션</option>
                </select>

                <label for="product-name">상품명:</label>
                <input type="text" name="name" required>

                <label for="product-price">가격:</label>
                <input type="number" name="price" required>

                <label for="product-price">할인율:</label>
                <input type="number" name="sale" required>

                <label for="product-image">대표 이미지</label>
                <input type="file" name="img1" required>

                <label for="product-image">설명 이미지</label>
                <input type="file" name="img2" required>
                
                <button type="submit">등록</button>
            </form>
        </div>
    </main>
<?php require_once "include/footer.php"; ?>