document.addEventListener('DOMContentLoaded', () => {
    /* -------------------------- 회원가입 -------------------------- */
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
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
    // 로그인
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
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
                        sessionStorage.setItem('user_id', data.user_id); // user_id를 세션 스토리지에 저장
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

    const userId = sessionStorage.getItem('user_id');
    const loginNavLink = document.querySelector('nav ul li a[href="login.php"]');
    
    if (userId && loginNavLink) {
        loginNavLink.textContent = 'Logout';
        loginNavLink.href = '#'; // 로그아웃 기능을 위해 링크 제거
        loginNavLink.addEventListener('click', function(event) {
            event.preventDefault();
            sessionStorage.removeItem('user_id');
            alert('로그아웃 성공');
            window.location.reload();
        });
    }
    

    /* -------------------------- 메인페이지 상품 리스트 -------------------------- */
    fetch('../item/item_list.php')
        .then(response => response.json())
        .then(items => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';

            items.forEach(item => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');

                const img = document.createElement('img');
                img.src = "../item_img/" + item.img1;
                img.alt = item.name;

                const h3 = document.createElement('h3');
                h3.textContent = item.name;

                const p = document.createElement('p');
                const salePrice = Math.ceil(item.price * item.sale);
                const formattedPrice = new Intl.NumberFormat('ko-KR').format(salePrice);
                p.textContent = `${formattedPrice}원`;


                productDiv.appendChild(img);
                productDiv.appendChild(h3);
                productDiv.appendChild(p);

                productDiv.addEventListener('click', () => {
                    window.location.href = `item.php?id=${item.seq}`;
                });

                productList.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });


    /* -------------------------- 상품 상세페이지 -------------------------- */
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');

    if (itemId) {
        fetch(`../item/item_detail.php?id=${itemId}`)
            .then(response => response.json())
            .then(data => {
                displayItem(data);
            })
            .catch(error => {
                console.error('Error fetching item data:', error);
            });
    } else {
        document.getElementById('item-info').innerHTML = '<p>Item not found.</p>';
    }
    function displayItem(item) {
        const imagesContainer = document.getElementById('item-images');
        const infoContainer = document.getElementById('item-info');

        const mainImage = document.createElement('img');
        mainImage.src = "../item_img/" + item.img1;
        mainImage.alt = item.name;
        imagesContainer.appendChild(mainImage);

        for (let i = 2; i <= 5; i++) {
            if (item[`img${i}`]) {
                const img = document.createElement('img');
                img.src = "../item_img/" + item[`img${i}`];
                img.alt = `${item.name} Image ${i}`;
                imagesContainer.appendChild(img);
            }
        }

        const title = document.createElement('h1');
        title.textContent = item.name;
        infoContainer.appendChild(title);

        const price = document.createElement('p');
        price.className = 'price';
        price.textContent = `${numberWithCommas(Math.floor(item.price * item.sale))}원`;
        infoContainer.appendChild(price);

        const description = document.createElement('p');
        description.className = 'description';
        description.textContent = item.content;
        infoContainer.appendChild(description);

        const addToCartButton = document.createElement('button');
        addToCartButton.className = 'add-to-cart';
        addToCartButton.textContent = '장바구니 담기';
        infoContainer.appendChild(addToCartButton);
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    /* -------------------------- 장바구니 -------------------------- */
    // 장바구니 담기
    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const userId = sessionStorage.getItem("user_id");
            const itemId = urlParams.get('id');
            console.log(userId);

            if (userId && itemId) {
                fetch(`../cart/set_cart.php?user=${userId}&item=${itemId}`)
                    .then(response => response.json())
                    .then(data => {
                        if(data.status === 'success'){
                            alert('장바구니 담기 성공');
                        } else {
                            alert('오류가 발생했습니다.');
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching item data:', error);
                        alert('장바구니 처리 중 오류가 발생했습니다.');
                    });
            } else {
                alert('사용자 ID나 상품 ID가 없습니다.');
            }
        }
    });

    // 장바구니 가져오기


});
