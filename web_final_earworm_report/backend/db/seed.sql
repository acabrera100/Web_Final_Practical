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
genre_id INT REFERENCES genres(id),
date_added TIMESTAMP
);

CREATE TABLE favorites(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id),
song_id INT REFERENCES songs(id)
);

CREATE TABLE comments(
id SERIAL PRIMARY KEY,
comment_body VARCHAR NOT NULL,
user_id INT REFERENCES users(id),
song_id INT REFERENCES songs(id),
time_added TIMESTAMP
);

INSERT INTO users(username)
VALUES ('felipe_queens'), ('kevlinMai'), ('squibbles'), ('scooby_dooby420'), ('anonymousBlissXoXo'), ('hippyDippy'), ('Metaru_Gurido_Soriduo'), ('Oscar De Leon'), ('celia_cruzin4bruisin'), ('#U2');

INSERT INTO genres(genre_name)
VALUES ('salsa'), ('merengue'), ('rap'), ('jazz'), ('rock');

INSERT INTO songs (title ,artist, img_url , user_id , genre_id, date_added)
VALUES

('Lloraras','Oscar De Leon', 'https://m.media-amazon.com/images/I/81D1UcUdESL._SS500_.jpg', 8, 1,'2019-03-20'),
('La Vaca','Mala Fe', 'https://images-na.ssl-images-amazon.com/images/I/51FtpLi8pZL.jpg', 9, 2,'2014-04-18'),
('N.Y State of Mind','Nas', 'https://i.scdn.co/image/0e1dd10af8d8ce24a4309d1132491286a9bd685d', 1, 3, '2019-03-19'),
('Birds Lament','MoonDog', 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/Moondog_%281969_Moondog_album%29.jpg/220px-Moondog_%281969_Moondog_album%29.jpg', 6, 4, '2019-03-20'),
('All downhhill from here','New Found Glory', 'https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Alldownhill_single.png/220px-Alldownhill_single.png', 10, 5, '2019-03-20 5:15'),
('Shoot me down','Lil Wayne', 'https://i1.sndcdn.com/artworks-000244301082-dqswvx-t500x500.jpg', 3, 3, '2019-03-20'),
('Ojos Chinos','El Gran Combo', 'https://img.discogs.com/DlBJI2eF_DpC20_UHmcVVajWFLc=/fit-in/589x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-4402057-1363925553-9659.jpeg.jpg', 9, 1, '2019-03-20'),
('Guallando','Fulanito', 'https://img.discogs.com/nFI1kofF-SukBOZHPuai6pdStjs=/fit-in/600x607/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1537950-1485173628-8308.jpeg.jpg', 5, 2, '2019-03-20'),
('Trouble on my Mind','Pusha-T ft. Tyler the Creator', 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/PushaTroubleOnMyMind.jpg/220px-PushaTroubleOnMyMind.jpg', 2, 3, '2019-03-20'),
('A Night In Tunisia','Dizzy Gillespie', 'https://images-na.ssl-images-amazon.com/images/I/61OLI1vE0%2BL._SX355_.jpg', 4, 4, '2019-02-21'),
('Through the fire and flames','DragonForce', 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Through_the_Fire_and_Flames_Single.jpg/220px-Through_the_Fire_and_Flames_Single.jpg', 10, 5, '2019-03-15'),
('Oige Mire Vea','Grupo Niche', 'https://img.youtube.com/vi/8miFQyTSDic/hqdefault.jpg', 9, 1, '2019-03-20'),
('Merengue Ripiao','Luis Lopez', 'https://m.media-amazon.com/images/I/91em-klGpyL._SS500_.jpg', 1, 2, '2019-03-18'),
('All NightMare Long','Metallica', 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Metallica_-_All_Nightmare_Long_cover_1.jpg/220px-Metallica_-_All_Nightmare_Long_cover_1.jpg', 7, 5, '2000-01-01'),
('98 Freestyle','Big L ft. Jay-Z', 'http://images.genius.com/c25759cb0f6915163b953fb6a3367d64.900x895x1.jpg', 4, 3, '2014-02-22');

INSERT INTO favorites(user_id,song_id)
VALUES (1,4),(1,1),(1,8),(1,15),(2,10),(1,6),(1,13),(2,14),
(3,3),(3,5),(3,6),(3,9),(3,15),(3,14),(4,4),(4,6),
(5,1),(5,2),(5,3),(5,4),(5,5),(6,4),(6,10),(7,5),
(7,15),(7,11),(8,1),(8,13),(8,2),(9,12),(9,8),(9,7),(8,7),
(10,14),(10,11),(10,5),(5,14),(5,11),(5,9),(1,15),(8,12);

INSERT INTO comments(comment_body,user_id,song_id)
VALUES
('This song opened me up to how silly and awesome jazzcan be',1,4),
('Oldie but goodie, essentials of salsa',1,1),
('Tyler the Creator really brings the song together',5,9),
('man you feel like you are there sometimes',6,10),
('looking for a good time or a pick me up. Play this when you gotta clean the house',8,13),
('get hype East Coast style',7,15),
('some of theses names are funny, but cemented as a legendary song still',8,7),
('lil wayne with some bud and coffee. LIT AF',4,6),
('when you gotta put the petal to the metal and just surge.No thinking just going',2,14),
('nostalgia brah',7,5),
('man I wanna go to DR',1,13),
('this is my mantra. I am a New York State of Mind. Change my Mind!',3,3),
('I am the master at this at Guitar Hero. Anyone defies me know where you can find me.',10,11),
('you have to , have to be from Colombia if you like this song',8,12),
('brah, ya know brah. Lite one for this old timer. ',6,4),
('WTH is going on this song. Its pure garbage',10,14),
('uhm just cuz you think that, its solely your opinion, go be belligerent elsewhere',1,14),
('yea ok your probably just a 9 yr old who heard it for the first time.GTFO here',10,14),
('I just exposed your IP address on www.trollerroller.com, might wanna be more careful with your words next time',1,14);
