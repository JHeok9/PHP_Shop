document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.product button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Added to cart!');
        });
    });
});

/* -------------------------- 회원가입 -------------------------- */
document.getElementById('registerForm').addEventListener('submit', function(event) {
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
