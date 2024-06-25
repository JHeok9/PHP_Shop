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
            <h2>배송지추가</h2>
            <form id="add-address" method="post">
                <label for="memberAddress">주소</label>
                <div class="signUp-input-area">
                    <input type="text" name="addr_num" placeholder="우편번호" maxlength="6" id="sample6_postcode">
                    
                    <button type="button" onclick="sample6_execDaumPostcode()">검색</button>
                </div>
                <div class="signUp-input-area">
                    <input type="text" name="addr" placeholder="도로명/지번 주소" id="sample6_address">
                </div>
                <div class="signUp-input-area">
                    <input type="text" name="addr_detail" placeholder="상세 주소" id="sample6_detailAddress">
                </div>
                <input type="text" name="name" placeholder="받는분 성함">
                <input type="text" name="phone_number" placeholder="핸드폰">
                
                <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
                <script>
                    function sample6_execDaumPostcode() {
                        new daum.Postcode({
                            oncomplete: function(data) {
                                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                                var addr = ''; // 주소 변수

                                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                                    addr = data.roadAddress;
                                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                                    addr = data.jibunAddress;
                                }

                                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                                document.getElementById('sample6_postcode').value = data.zonecode;
                                document.getElementById("sample6_address").value = addr;
                                // 커서를 상세주소 필드로 이동한다.
                                document.getElementById("sample6_detailAddress").focus();
                            }
                        }).open();
                    }
                </script>
                <input type="submit" value="추가">
            </form>

            <h2>배송지목록</h2>
            <div id="addresses-list"></div>
        </div>
    </main>
<?php require_once "include/footer.php"; ?>