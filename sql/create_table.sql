-- 회원테이블
CREATE TABLE user
(
  seq          int(11)      NOT NULL AUTO_INCREMENT COMMENT '고유번호',
  id           varchar(50)  NOT NULL UNIQUE COMMENT '아이디',
  password     VARCHAR(255)  NOT NULL COMMENT '비밀번호',
  name         VARCHAR(255) NOT NULL COMMENT '이름',
  nickname     VARCHAR(255) NOT NULL COMMENT '닉네임',
  phone_number VARCHAR(15)  NOT NULL COMMENT '핸드폰',
  join_date    datetime     NOT NULL DEFAULT NOW() COMMENT '가입일',
  ban          varchar(1)   NOT NULL DEFAULT 'N' COMMENT '정지여부',
  signout      varchar(1)   NOT NULL DEFAULT 'N' COMMENT '탈퇴여부',
  signout_date   datetime     NULL     COMMENT '탈퇴일',
  PRIMARY KEY (seq)
) COMMENT '회원';




-- 주소테이블
CREATE TABLE address
(
  seq          int(11)      NOT NULL AUTO_INCREMENT COMMENT '고유번호',
  user_seq     int(11)      NOT NULL COMMENT '회원고유번호',
  name         varchar(255) NOT NULL COMMENT '받는분성함',
  addr_num     varchar(6)   NOT NULL COMMENT '우편번호',
  addr         varchar(255) NOT NULL COMMENT '기본주소',
  addr_detail  varchar(255) NOT NULL COMMENT '상세주소',
  phone_number varchar(15)  NOT NULL COMMENT '핸드폰',
  def          varchar(1)   NOT NULL DEFAULT 'N' COMMENT '기본배송지여부',
  PRIMARY KEY (seq)
) COMMENT '회원주소';

ALTER TABLE address
  ADD CONSTRAINT FK_user_TO_address
    FOREIGN KEY (user_seq)
    REFERENCES user (seq);




-- 상품 테이블
CREATE TABLE item
(
  seq          int(11)      NOT NULL AUTO_INCREMENT COMMENT '고유번호',
  category_seq int(11)      NOT NULL COMMENT '카테고리번호',
  name         varchar(255) NOT NULL COMMENT '상품명',
  img1         varchar(255) NULL     COMMENT '이미지1',
  img2         varchar(255) NULL     COMMENT '이미지2',
  img3         varchar(255) NULL     COMMENT '이미지3',
  img4         varchar(255) NULL     COMMENT '이미지4',
  img5         varchar(255) NULL     COMMENT '이미지5',
  content      text         NULL     COMMENT '상품설명',
  price        int(11)      NOT NULL COMMENT '정가',
  sale         float        NOT NULL DEFAULT 1 COMMENT '할인율',
  reg_date     datetime     NOT NULL DEFAULT NOW() COMMENT '등록일',
  cnt          int(11)      NOT NULL DEFAULT 0 COMMENT '재고',
  deleted      varchar(1)   NOT NULL DEFAULT 'N' COMMENT '삭제여부',
  PRIMARY KEY (seq)
) COMMENT '상품';

ALTER TABLE item
  ADD CONSTRAINT FK_item_category_TO_item
    FOREIGN KEY (category_seq)
    REFERENCES item_category (seq);




-- 상품 카테고리 테이블
CREATE TABLE item_category
(
  seq  int(11)     NOT NULL AUTO_INCREMENT COMMENT '고유번호',
  seq2 int(11)     NULL     COMMENT '참조 카테고리번호',
  name varchar(50) NOT NULL COMMENT '카테고리명',
  PRIMARY KEY (seq)
) COMMENT '상품카테고리';

ALTER TABLE item_category
  ADD CONSTRAINT FK_item_category_TO_item_category
    FOREIGN KEY (seq2)
    REFERENCES item_category (seq);




-- 주문 테이블
CREATE TABLE orders
(
  seq        int(11)      NOT NULL AUTO_INCREMENT COMMENT '고유번호',
  user_seq   int(11)      NOT NULL COMMENT '회원고유번호',
  addr_seq   int(11)      NOT NULL COMMENT '주소고유번호',
  order_date datetime     NOT NULL DEFAULT NOW() COMMENT '주문날짜',
  price      int(11)      NOT NULL COMMENT '주문가격',
  req        varchar(255) NULL     COMMENT '배송요청사항',
  status     varchar(255) NOT NULL DEFAULT '주문완료' COMMENT '주문현황',
  PRIMARY KEY (seq)
) COMMENT '주문';

ALTER TABLE orders
  ADD CONSTRAINT FK_user_TO_order
    FOREIGN KEY (user_seq)
    REFERENCES user (seq);

ALTER TABLE orders
  ADD CONSTRAINT FK_address_TO_order
    FOREIGN KEY (addr_seq)
    REFERENCES address (seq);




-- 주문 상세 테이블
CREATE TABLE order_detail
(
  seq         int(11)    NOT NULL AUTO_INCREMENT COMMENT '고유번호',
  order_seq   int(11)    NOT NULL COMMENT '주문고유번호',
  item_seq    int(11)    NOT NULL COMMENT '상품고유번호',
  price       int(11)    NULL     COMMENT '가격',
  cnt         int(11)    NULL     COMMENT '개수',
  reviw_check varchar(1) NOT NULL DEFAULT 'N' COMMENT '리뷰여부',
  PRIMARY KEY (seq)
) COMMENT '주문상세';


ALTER TABLE order_detail
  ADD CONSTRAINT FK_order_TO_order_detail
    FOREIGN KEY (order_seq)
    REFERENCES orders (seq);

ALTER TABLE order_detail
  ADD CONSTRAINT FK_item_TO_order_detail
    FOREIGN KEY (item_seq)
    REFERENCES item (seq);




-- 리뷰 테이블
CREATE TABLE review
(
  seq      int(11)  NOT NULL AUTO_INCREMENT COMMENT '고유번호',
  item_seq int(11)  NOT NULL COMMENT '상품고유번호',
  user_seq int(11)  NOT NULL COMMENT '회원고유번호',
  star     int(1)   NOT NULL COMMENT '별점',
  content  text     NOT NULL COMMENT '리뷰',
  reg_date datetime NOT NULL DEFAULT NOW() COMMENT '등록일',
  PRIMARY KEY (seq)
) COMMENT '상품리뷰';

ALTER TABLE review
  ADD CONSTRAINT FK_item_TO_review
    FOREIGN KEY (item_seq)
    REFERENCES item (seq);

ALTER TABLE review
  ADD CONSTRAINT FK_user_TO_review
    FOREIGN KEY (user_seq)
    REFERENCES user (seq);


