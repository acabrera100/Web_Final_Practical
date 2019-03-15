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
VALUES ('Lloraras','Oscar De Leon', 'https://m.media-amazon.com/images/I/81D1UcUdESL._SS500_.jpg', 8, 1),
('La Vaca','Mala Fe', 'https://images-na.ssl-images-amazon.com/images/I/51FtpLi8pZL.jpg', 9, 2),
('N.Y State of Mind','Nas', 'https://i.scdn.co/image/0e1dd10af8d8ce24a4309d1132491286a9bd685d', 1, 3),
('Birds Lament','MoonDog', 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/Moondog_%281969_Moondog_album%29.jpg/220px-Moondog_%281969_Moondog_album%29.jpg', 6, 4),
('All downhhill from here','New Found Glory', 'https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Alldownhill_single.png/220px-Alldownhill_single.png', 10, 5),
('Shoot me down','Lil Wayne', 'https://i1.sndcdn.com/artworks-000244301082-dqswvx-t500x500.jpg', 3, 3),
('Ojos Chinos','El Gran Combo', 'https://img.discogs.com/DlBJI2eF_DpC20_UHmcVVajWFLc=/fit-in/589x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-4402057-1363925553-9659.jpeg.jpg', 9, 1),
('Guallando','Fulanito', 'https://img.discogs.com/nFI1kofF-SukBOZHPuai6pdStjs=/fit-in/600x607/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1537950-1485173628-8308.jpeg.jpg', 5, 2),
('Trouble on my Mind','Pusha-T ft. Tyler the Creator', 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/PushaTroubleOnMyMind.jpg/220px-PushaTroubleOnMyMind.jpg', 2, 3),
('A Night In Tunisia','Dizzy Gillespie', 'https://images-na.ssl-images-amazon.com/images/I/61OLI1vE0%2BL._SX355_.jpg', 4, 4),
('Through the fire and flames','DragonForce', 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Through_the_Fire_and_Flames_Single.jpg/220px-Through_the_Fire_and_Flames_Single.jpg', 10, 5),
('Oige Mire Vea','Grupo Niche', 'https://img.youtube.com/vi/8miFQyTSDic/hqdefault.jpg', 9, 1),
('Merengue Ripiao','Luis Lopez', 'https://m.media-amazon.com/images/I/91em-klGpyL._SS500_.jpg', 1, 2),
('All NightMare Long','Metallica', 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Metallica_-_All_Nightmare_Long_cover_1.jpg/220px-Metallica_-_All_Nightmare_Long_cover_1.jpg', 7, 5),
('98 Freestyle','Big L ft. Jay-Z', 'http://images.genius.com/c25759cb0f6915163b953fb6a3367d64.900x895x1.jpg', 4, 3);
