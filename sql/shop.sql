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





