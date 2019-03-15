DROP DATABASE IF EXISTS musicstoragedatabase;
CREATE DATABASE musicstoragedatabase;

\c musicstoragedatabase;

CREATE TABLE users(
id SERIAL PRIMARY KEY,
username VARCHAR UNIQUE
);

CREATE TABLE genres(
id SERIAL PRIMARY KEY,
genre_name VARCHAR UNIQUE
);

CREATE TABLE songs(
id SERIAL PRIMARY KEY,
title VARCHAR NOT NULL,
artist VARCHAR NOT NULL,
img_url VARCHAR NOT NULL,
user_id INT REFERENCES users(id),
genre_id INT REFERENCES genres(id)
);

CREATE TABLE favorites(
id SERIAL PRIMARY KEY
);
CREATE TABLE comments(
id SERIAL PRIMARY KEY
);

INSERT INTO users(username)
VALUES ('felipe_queens'), ('kevlinMai'), ('squibbles'), ('scooby_dooby420'), ('anonymousBlissXoXo'), ('hippyDippy'), ('Metaru_Gurido_Soriduo'), ('Oscar De Leon'), ('celia_cruzin4bruisin'), ('#U2');
INSERT INTO genres(genre_name)
VALUES ('salsa'), ('merengue'), ('rap'), ('jazz'), ('rock');
INSERT INTO songs (title ,artist, img_url , user_id , genre_id)
VALUES ('Lloraras','Oscar De Leon', 'https://m.media-amazon.com/images/I/81D1UcUdESL._SS500_.jpg', 8, 1);
