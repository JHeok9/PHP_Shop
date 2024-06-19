<?php
require_once "include/header.php";
?>

    <main>
        <section class="register-form">
            <h1>회원가입</h1>
            <form id="registerForm" action="../user/join_user.php" method="POST">
                <label for="username">아이디:</label>
                <input type="text" id="username" name="id" required>

                <label for="password">비밀번호:</label>
                <input type="password" id="password" name="password" required>

                <label for="name">이름:</label>
                <input type="text" id="name" name="name" required>
                
                <label for="nickname">닉네임:</label>
                <input type="text" id="nickname" name="nickname" required>

                <label for="phone_number">전화번호:</label>
                <input type="text" id="phone_number" name="phone_number" required>

                <!-- 주소 입력 -->
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

                <button type="submit">회원가입</button>
            </form>
        </section>
    </main>
   
<?php require_once "include/footer.php"; ?>