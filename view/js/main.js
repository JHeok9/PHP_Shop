document.addEventListener('DOMContentLoaded', () => {
    initializeLoginStatus();
    checkCurrentPageAndLoad();

    /* -------------------------- 초기화 함수 -------------------------- */
    function initializeLoginStatus() {
        const loginLogout = document.getElementById('login-logout');
        const userId = sessionStorage.getItem('user_id');
        if (userId) {
            loginLogout.innerHTML = '<a href="logout.php">Logout</a>';
            setupLogout();
        }
    }

    function checkCurrentPageAndLoad() {
        if (window.location.pathname.includes('cart.php')) {
            loadCart();
        }
        if (window.location.pathname.includes('order.php')) {
            loadOrderPage();
        }
        if (window.location.pathname.includes('item.php')) {
            loadItemDetailPage();
        }
        if (window.location.pathname.includes('join.php')) {
            setupRegisterForm();
        }
        if (window.location.pathname.includes('login.php')) {
            setupLoginForm();
        }
        if (window.location.pathname.includes('index.php')) {
            loadProductList();
        }
    }

    /* -------------------------- 로그인/로그아웃 -------------------------- */
    function setupLogout() {
        const loginNavLink = document.querySelector('#login-logout');
        loginNavLink.textContent = 'Logout';
        loginNavLink.href = '#'; // 로그아웃 기능을 위해 링크 제거
        loginNavLink.addEventListener('click', function (event) {
            event.preventDefault();
            sessionStorage.removeItem('user_id');
            alert('로그아웃 성공');
            window.location.reload();
        });
    }

    function setupLoginForm() {
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
    }

    /* -------------------------- 회원가입 -------------------------- */
    function setupRegisterForm() {
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
    }

    /* -------------------------- 메인페이지 상품 리스트 -------------------------- */
    function loadProductList() {
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
    }

    /* -------------------------- 상품 상세페이지 -------------------------- */
    function loadItemDetailPage() {
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
        addToCartButton.addEventListener('click', () => addToCart(item.seq));
        infoContainer.appendChild(addToCartButton);
        
        const buyButton = document.createElement('button');
        buyButton.textContent = '구매';
        buyButton.className = 'item-buy-button';
        buyButton.addEventListener('click', () => {
            window.location.href = `../view/order.php?cart_id=${item.seq}`;
        });
        infoContainer.appendChild(buyButton);
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function addToCart(itemId) {
        const userId = sessionStorage.getItem('user_id');
        if (!userId) {
            alert('로그인이 필요합니다.');
            window.location.href = '../view/login.php';
            return;
        }

        const cartData = {
            user_id: userId,
            item_id: itemId
        };

        fetch('../cart/set_cart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('상품이 장바구니에 추가되었습니다.');
            } else {
                alert('장바구니 추가 중 오류가 발생했습니다.');
            }
        })
        .catch(error => {
            console.error('Error adding to cart:', error);
            alert('장바구니 추가 중 오류가 발생했습니다.');
        });
    }

    /* -------------------------- 장바구니 -------------------------- */
    function loadCart() {
        const userId = sessionStorage.getItem('user_id');
        if (!userId) {
            document.getElementById('cart-items').innerHTML = '<p>로그인이 필요합니다.</p>';
            return;
        }

        fetch(`../cart/get_cart.php?user=${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    document.getElementById('cart-items').innerHTML = '<p>장바구니에 상품이 없습니다.</p>';
                } else {
                    displayCartItems(data);
                }
            })
            .catch(error => {
                console.error('Error fetching cart data:', error);
                document.getElementById('cart-items').innerHTML = '<p>장바구니를 불러오는 중 오류가 발생했습니다.</p>';
            });
    }

    function displayCartItems(items) {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');

            const img = document.createElement('img');
            img.src = "../item_img/" + item.img1;
            img.alt = item.name;

            const h3 = document.createElement('h3');
            h3.textContent = item.name;

            const p = document.createElement('p');
            const salePrice = Math.ceil(item.price * item.sale);
            const formattedPrice = new Intl.NumberFormat('ko-KR').format(salePrice);
            p.textContent = `${formattedPrice}원`;

            const buyButton = document.createElement('button');
            buyButton.textContent = '구매';
            buyButton.className = 'buy-button';
            buyButton.addEventListener('click', () => {
                window.location.href = `../view/order.php?cart_id=${item.seq}`;
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '삭제';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', () => {
                removeFromCart(item.cart_id);
            });

            // 아이템 이름 클릭 시 상품 상세 페이지로 이동
            h3.addEventListener('click', () => {
                window.location.href = `../view/item.php?id=${item.seq}`;
            });

            itemDiv.appendChild(img);
            itemDiv.appendChild(h3);
            itemDiv.appendChild(p);
            itemDiv.appendChild(buyButton);
            itemDiv.appendChild(deleteButton);

            cartItemsContainer.appendChild(itemDiv);
        });
    }

    function removeFromCart(cartId) {
        fetch('../cart/remove_cart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cart_id: cartId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('상품이 장바구니에서 삭제되었습니다.');
                location.reload(); // 페이지 새로고침
            } else {
                alert('상품 삭제 중 오류가 발생했습니다.');
            }
        })
        .catch(error => {
            console.error('Error removing cart item:', error);
            alert('상품 삭제 중 오류가 발생했습니다.');
        });
    }

    /* -------------------------- 주문 페이지 -------------------------- */
    function loadOrderPage() {
        // 주문 페이지 로드 함수 로직 작성
    }
});