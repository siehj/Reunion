
USE FTdb;

CREATE TABLE familyMember (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(200),
  password varchar(200),
  email varchar(200),
  phone varchar(200),
  vote int,
  vote_id int,
  FOREIGN KEY (vote_id) REFERENCES destination(id)
);

CREATE TABLE destinations (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  place varchar(200),
  votes int
);

