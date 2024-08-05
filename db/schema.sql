-- Drop the database if it exists
DROP DATABASE IF EXISTS unleashed_db;

-- Create the database
CREATE DATABASE unleashed_db;

-- Connect to the database
\c unleashed_db;

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  username VARCHAR(30) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL  -- Increased length for hashed passwords
);

-- Create pets table
CREATE TABLE pets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  species VARCHAR(30) NOT NULL,
  breed VARCHAR(50),
  age INTEGER,
  owner_id INTEGER REFERENCES users(id)
);

