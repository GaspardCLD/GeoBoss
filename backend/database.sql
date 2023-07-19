-- Suppression des tables existantes
DROP TABLE IF EXISTS score;

DROP TABLE IF EXISTS city;

DROP TABLE IF EXISTS user;

-- Création de la base de données
CREATE DATABASE IF NOT EXISTS geoboss;

USE geoboss;

-- Table "user"
CREATE TABLE IF NOT EXISTS user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pseudo VARCHAR(50),
  hashedPassword VARCHAR(255)
);

-- Table "score"
CREATE TABLE IF NOT EXISTS score (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  score INT,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- Table "city"
CREATE TABLE IF NOT EXISTS city (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  lat VARCHAR(50),
  lon VARCHAR(50),
  population INT
);

INSERT INTO
  user (pseudo, hashedPassword)
VALUES
  ('user1', 'Password1'),
  ('user2', 'Password2'),
  ('user3', 'Password3');