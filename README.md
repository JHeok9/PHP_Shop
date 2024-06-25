### 버전
- php 8.3.7
- mysql 8.0.37
- apach 2.4.59

### PHP_SHOP
- API형식 Json 데이터
- Frontend : JS
- Backend : PHP
- 로그인정보 JS Session Storage 저장


### Database
![shop_erd](https://github.com/JHeok9/PHP_Shop/assets/121952545/037633aa-29f4-483f-ab6f-844359220c93)

#### SQL
- shop_erd.png : ERD 이미지
- shop.vuerd.json : VSCode ERD
- create_tabel.sql : 테이블 생성문
- shop.sql : 쿼리


### view
- main.js : 서버통신 후 데이터 표출
- index.php : 메인 페이지
- login.php : 로그인 페이지
- join.php : 회원가입 페이지
- item.php : 상품 상세페이지
- cart.php : 장바구니 페이지
- order.php : 주문 페이지
- admin.php : 회원 주문목록
- addItem.php : 상품등록
- modifyItemList.php : 등록된 상품 목록
- modifyItem.php : 상품수정


### Sever
#### user
- join_user.php : 회원가입
- login.php : 로그인

#### item
- item_list.php : 상품 전체목록
- item_detail.php : 상품 상세

#### cart
- get_cart.php : 장바구니 리스트
- set_cart.php : 장바구니 담기
- remove_cart.php : 장바구니 삭제

#### order
- order_data.php : 유저주소, 상품정보 반환
- order.php : 주문

#### mypage
- addresses.php : 배송지 목록
- add_address.php : 배송지 추가
- orders.php : 주문목록
- user_info.php : 회원정보

#### admin
- orders.php : 회원 주문목록
- add_item.php : 상품등록
- modify_item.php : 상품수정
- delete_item.php : 상품삭제
- update_order_status.php : 주문현황 변경
