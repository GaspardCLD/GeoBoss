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
  pseudo VARCHAR(50) NOT NULL,
  hashedPassword VARCHAR(255) NOT NULL
);

-- Table "score"
CREATE TABLE IF NOT EXISTS score (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  score INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- Table "city"
CREATE TABLE IF NOT EXISTS city (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  lon VARCHAR(50) NOT NULL,
  lat VARCHAR(50) NOT NULL,
  population INT NOT NULL,
  is_used BOOLEAN NOT NULL default false
);

-- Insertion d'exemple dans la table "user"
INSERT INTO
  user (pseudo, hashedPassword)
VALUES
  (
    'Gaspi',
    '$argon2id$v=19$m=65536,t=5,p=1$GixxtmbFYS7IMpnqWrsjzA$VJHjeGPBL4V/lkEe+24mo53QkOedQxn3qpcvy9esP/8'
  ),
  (
    'Barbie',
    '$argon2id$v=19$m=65536,t=5,p=1$GixjtmbFYS7IMpnqWrsjzA$VJHjeGPBL4V/lkEe+24mo53QkOedQxn3qpcvy9esP/8'
  ),
  (
    'Oppenheimer',
    '$argon2id$v=19$m=65536,t=5,p=1$GixxtmbFYS7IMpnqsrsjzA$VJHjeGPBL4V/lkEe+24mo53QkOedQxn3qpcvy9esP/8'
  );

INSERT INTO
  score (user_id, score)
VALUES
  (1, 821),
  (1, 223),
  (1, 792),
  (2, 867),
  (2, 300),
  (2, 932),
  (3, 511),
  (3, 117),
  (3, 392);