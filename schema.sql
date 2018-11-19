
USE FTdb;

CREATE TABLE "users" (
  "id" SERIAL,
  "name" VARCHAR(30),
  "username" VARCHAR(20),
  "password" VARCHAR(200),
  "email" VARCHAR(100),
  "phone" VARCHAR(20),
  "vote" INTEGER,
  "vote_id" INTEGER,
  PRIMARY KEY ("id")
);
ALTER TABLE "users" ADD FOREIGN KEY ("vote_id") REFERENCES "destinations" ("id");
  -- "vote_id" INTEGER,
  -- FOREIGN KEY (vote_id) REFERENCES destination(id)

CREATE TABLE "destinations" (
  "id" SERIAL,
  "place" VARCHAR(200),
  "votes" INTEGER,
  PRIMARY KEY ("id")
);

