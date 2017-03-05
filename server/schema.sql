CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username char(20) NOT NULL,
  PRIMARY KEY(id)
);

-- CREATE TABLE rooms (
--   id int NOT NULL AUTO_INCREMENT,
--   roomname char(20) NOT NULL,
--   PRIMARY KEY(id)
-- );

CREATE TABLE messages (
  id int NOT NULL AUTO_INCREMENT,
  content varchar(255) NOT NULL,
  userId int NOT NULL,
  roomname varchar(255) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(userId) REFERENCES users(id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

