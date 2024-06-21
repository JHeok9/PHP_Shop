document.addEventListener('DOMContentLoaded', () => {
    initializeLoginStatus();
    checkCurrentPageAndLoad();

    /* -------------------------- 초기화 함수 -------------------------- */
    function initializeLoginStatus() {
        const loginLogout = document.getElementById('login-logout');
        const userId = sessionStorage.getItem('user_id');
        if (userId) {
            loginLogout.innerHTML = '<a href="logout.php">Logout</a>';

            if(userId === '1'){
                const adminLi = document.getElementById('reAdmin');
                const headerA = document.createElement('a');
                headerA.innerText = "admin";
                headerA.href = "admin.php";
                
                adminLi.appendChild(headerA);
            }

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
        if (window.location.pathname.includes('mypage.php')) {
            loadUserInfo();
        }
        if (window.location.pathname.includes('admin.php')) {
            loadAdminOrders();
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
                            sessionStorage.setItem('user_id', data.user_seq);
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
            window.location.href = `../view/order.php?item_id=${item.seq}`;
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
                window.location.href = `../view/order.php?item_id=${item.seq}`;
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
        const userId = sessionStorage.getItem('user_id');
        const urlParams = new URLSearchParams(window.location.search);
        const itemId = urlParams.get('item_id');

        if (!userId || !itemId) {
            alert('Invalid access. Missing user ID or item ID.');
            return;
        }

        fetchOrderData(userId, itemId);
    }

    function fetchOrderData(userSeq, itemSeq) {
        const requestData = {
            user_seq: userSeq,
            item_seq: itemSeq
        };

        fetch('../order/order_data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                displayOrderData(data);
            } else {
                alert('Error fetching order data.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error processing your request.');
        });
    }

    function displayOrderData(data) {
        const userInfo = data.address;
        const itemInfo = data.item;

        document.getElementById('user-name').textContent = userInfo.name;
        document.getElementById('user-address').textContent = `${userInfo.addr} ${userInfo.addr_detail} ${userInfo.addr_num}`;

        document.getElementById('order-item-image').src = `../item_img/${itemInfo.img1}`;
        document.getElementById('item-name').textContent = itemInfo.name;
        document.getElementById('item-price').textContent = `${new Intl.NumberFormat('ko-KR').format(Math.ceil(itemInfo.price * itemInfo.sale))}원`;

        document.getElementById('confirm-order').addEventListener('click', () => {
            confirmOrder(userInfo, itemInfo);
        });
    }

    function confirmOrder(userInfo, itemInfo) {
        const orderData = {
            user_seq: userInfo.user_seq,
            addr_seq: userInfo.seq,
            item_seq: itemInfo.seq,
            price: Math.ceil(itemInfo.price * itemInfo.sale),
        };

        fetch('../order/order.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('주문이 확인되었습니다!');
                window.location.href = 'index.php';
            } else {
                alert('주문 중 오류가 발생했습니다.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('주문 중 오류가 발생했습니다.');
        });
    }


    /* -------------------------- 마이 페이지 -------------------------- */
    function loadUserInfo() {
        const userId = sessionStorage.getItem('user_id');
        if (!userId) {
            alert('Invalid access. Missing user ID or item ID.');
            return;
        }

        loadProfile(userId);

        document.getElementById('show-profile').addEventListener('click', (e) => {
            e.preventDefault();
            showSection('profile-container');
            loadProfile(userId);
        });
    
        document.getElementById('show-orders').addEventListener('click', (e) => {
            e.preventDefault();
            showSection('orders-container');
            loadOrders(userId);
        });
    
        document.getElementById('show-addresses').addEventListener('click', (e) => {
            e.preventDefault();
            showSection('addresses-container');
            loadAddresses(userId);
        });
    }

    function showSection(sectionId) {
        const sections = document.querySelectorAll('.content-container');
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
    }

    function loadProfile(userSeq) {
        const requestData = {
            user_seq: userSeq
        };

        fetch('../mypage/user_info.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                user_ifno = data.user_info
                document.getElementById('user-id').textContent = `아이디: ${user_ifno.id}`;
                document.getElementById('user-name').textContent = `이름: ${user_ifno.name}`;
                document.getElementById('user-phone_number').textContent = `전화번호: ${user_ifno.phone_number}`;
            } else {
                alert('Error.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error processing your request.');
        });
    }
    
    function loadOrders(userSeq) {
        const requestData = {
            user_seq: userSeq
        };

        fetch(`../mypage/orders.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
            .then(response => response.json())
            .then(data => {
                const ordersList = document.getElementById('orders-list');
                ordersList.innerHTML = '';
                data.orders.forEach(order => {
                    const orderDiv = document.createElement('div');
                    orderDiv.classList.add('order');
    
                    const orderName = document.createElement('p');
                    orderName.textContent = `상품명: ${order.name}`;
    
                    const orderDate = document.createElement('p');
                    orderDate.textContent = `주문날짜: ${order.order_date}`;
    
                    const orderPrice = document.createElement('p');
                    orderPrice.textContent = `가격: ${order.price}원`;
                    
                    const orderStatus = document.createElement('p');
                    orderStatus.textContent = `주문상태: ${order.status}`;
                    
                    orderDiv.appendChild(orderName);
                    orderDiv.appendChild(orderDate);
                    orderDiv.appendChild(orderPrice);
                    orderDiv.appendChild(orderStatus);
    
                    ordersList.appendChild(orderDiv);
                });
            })
            .catch(error => console.error('Error loading orders:', error));
    }
    
    function loadAddresses(userSeq) {
         const requestData = {
            user_seq: userSeq
        };

        fetch(`../mypage/addresses.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
            .then(response => response.json())
            .then(data => {
                const addressesList = document.getElementById('addresses-list');
                addressesList.innerHTML = '';
                data.addresses.forEach(address => {
                    const addressDiv = document.createElement('div');
                    addressDiv.classList.add('address');
    
                    const addressDetails = document.createElement('p');
                    addressDetails.textContent = `${address.addr} ${address.addr_detail}, ${address.addr_num}`;
    
                    addressDiv.appendChild(addressDetails);
    
                    addressesList.appendChild(addressDiv);
                });
            })
            .catch(error => console.error('Error loading addresses:', error));
    }



    /* -------------------------- 관리자 페이지 -------------------------- */
    // 주문현황
    function loadAdminOrders() {
        fetch(`../admin/orders.php`)
            .then(response => response.json())
            .then(data => {
                const adminOrders = document.getElementById('admin-orders');
                adminOrders.innerHTML = ''; // Clear existing content
    
                data.forEach(order => {
                    let html = '<tr>';
                    html += `<td>${order.seq}</td>`;
                    html += `<td>${order.id}</td>`;
                    html += `<td>${order.name}</td>`;
                    html += `<td>${order.price}</td>`;
                    html += `<td>${order.addr} ${order.addr_detail}</td>`;
                    html += `<td>${order.order_date}</td>`;
                    html += `<td>${order.status}</td>`;
                    html += '</tr>';
    
                    adminOrders.insertAdjacentHTML('beforeend', html);
                });
            })
            .catch(error => console.error('Error loading orders:', error));
    }

    // 상품등록
    

});
