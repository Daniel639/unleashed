DROP DATABASE IF EXISTS unleashed;
CREATE DATABASE unleashed;

CREATE DATABASE database_development;

\c unleashed_db;

CREATE TABLE users (
  id INTEGER NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  username VARCHAR (30) NOT NULL,
  password VARCHAR (30) NOT NULL
);

