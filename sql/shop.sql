-- 회원 테이블
select * from user;
delete from user where seq=1;
ALTER TABLE user AUTO_INCREMENT = 1;

alter table user modify password VARCHAR(255);

-- 주소 테이블
select * from address;
delete from address where seq=1;
ALTER TABLE address AUTO_INCREMENT = 1;

commit;

select a.* 
  from address a left join user u
    on a.user_seq = u.seq
 where u.seq = 3;


-- 상품 카테고리 가상 데이터 입력 
insert into item_category (name) values('가전');
insert into item_category (name) values('가구');
insert into item_category (name) values('패션');

commit;

select * from item_category;

-- 상품 가상 데이터 입력
insert into item (category_seq, name, img1, img2, price, cnt)
values(1, '레전드 화질 TV', '16f6a079e0b5480388da504ddd7e9eb6.jpg', '7820422474860941-e4ad88e4-a496-4405-8ad5-b5bb13141473.jpg', 1000000, 5);

insert into item (category_seq, name, img1, img2, price, cnt)
values(2, '어쩌구 저쩌구 수납장', '3749919010094291-23a1a294-b146-4704-a45b-cf16d8dc79c4.jpg', '1203915874313032-673f8d83-b660-4baf-b071-43da9c168592.jpg', 90000, 10);

insert into item (category_seq, name, img1, img2, price, cnt)
values(3, '기가막힌 쫀쫀이 양말', '801995393766375-e3ac3a4f-87d1-47a3-a278-88e43cc8646c.jpg', '3881903640734703-8ec9dd77-d5ac-4713-9b77-19d8d68032d4.jpg', 13000, 20);

commit;
select * from item;


-- 장바구니
select * from cart;
delete from cart where seq=1;
ALTER TABLE cart AUTO_INCREMENT = 1;


select i.*
  from cart c left join item i
    on c.item_seq = i.seq
 where c.user_seq = 1;



