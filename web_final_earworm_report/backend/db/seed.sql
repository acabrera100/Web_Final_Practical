DROP DATABASE IF EXISTS musicstoragedatabase;
CREATE DATABASE musicstoragedatabase;

\c musicstoragedatabase;

CREATE TABLE users(
id SERIAL PRIMARY KEY
);
CREATE TABLE genres(
id SERIAL PRIMARY KEY
);
CREATE TABLE songs(
id SERIAL PRIMARY KEY
);
CREATE TABLE favorites(
id SERIAL PRIMARY KEY
);
CREATE TABLE comments(
id SERIAL PRIMARY KEY
);
