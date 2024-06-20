document.addEventListener('DOMContentLoaded', () => {
    // 상품 버튼 클릭 이벤트
    const buttons = document.querySelectorAll('.product button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Added to cart!');
        });
    });

    /* -------------------------- 회원가입 -------------------------- */
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault(); // 기본 폼 제출 동작을 방지

            const formData = new FormData(this);
            const jsonData = {};

            formData.forEach((value, key) => {
                jsonData[key] = value;
            });

            fetch('../user/join_user.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert(data.message);
                    window.location.href = '../view/login.php';
                } else {
                    alert(data.message);
                    window.location.href = '../view/login.php';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('회원가입 처리 중 오류가 발생했습니다.');
                window.location.href = '../view/login.php';
            });
        });
    }

    /* -------------------------- 로그인 -------------------------- */
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // 기본 폼 제출 동작을 방지

            const loginFormData = new FormData(this);
            const loginJsonData = {};

            loginFormData.forEach((value, key) => {
                loginJsonData[key] = value;
            });

            fetch('../user/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginJsonData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert('로그인 성공');
                    window.location.href = '../view/index.php';
                } else {
                    alert('로그인 실패');
                    window.location.href = '../view/login.php';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('로그인 처리 중 오류가 발생했습니다.');
                window.location.href = '../view/login.php';
            });
        });
    }
});
