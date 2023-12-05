-- 사용자 테이블 생성
CREATE TABLE IF NOT EXISTS users (
  userid INTEGER PRIMARY KEY,
  username TEXT,
  password TEXT
);

--초기 사용자 추가

INSERT INTO users(userid, username, password) VALUES
  (1, 'user1', 'password1'),
  (2, 'user2', 'password2');

--상품 테이블 추가

CREATE TABLE IF NOT EXISTS products (
  productid INTEGER PRIMARY KEY,
  productname TEXT,
  price INTEGER
);

-- 초기 상품 추가

INSERT INTO products(productid, productname, price) VALUES
  (1, 'product1', '2000'),
  (2, 'product2', '3000'),
  (3, 'product3', '4000');

--도서 테이블 추가

CREATE TABLE IF NOT EXISTS books (
  bookid INTEGER PRIMARY KEY,
  title TEXT,
  author TEXT,
  genre TEXT
);

--초기 도서 목록 추가

INSERT INTO books (bookid, title, author, genre) VALUES
  (1, 'book1', 'Author1','Fiction'),
  (2, 'book2', 'Author2','Non-Fiction')
  (3, 'book3', 'Author3','My-stery');