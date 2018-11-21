
CREATE TABLE "users" (
  "id" SERIAL,
  "name" VARCHAR(30),
  "username" VARCHAR(20),
  "password" VARCHAR(200),
  "email" VARCHAR(100),
  "phone" VARCHAR(20),
  "city" VARCHAR(20),
  "state" VARCHAR(2),
  "vote" INTEGER,
  "vote_id" INTEGER,
  PRIMARY KEY ("id")
);

CREATE TABLE "destinations" (
  "id" SERIAL,
  "place" VARCHAR(200),
  "votes" INTEGER,
  PRIMARY KEY ("id")
);

CREATE TABLE "hotels" (
  "id" SERIAL,
  "name" VARCHAR(100),
  "address" VARCHAR(100),
  "cost" VARCHAR(10),
  "stars" INTEGER,
  "url" VARCHAR(200),
  "img" VARCHAR(200),
  PRIMARY KEY ("id")
);

ALTER TABLE "users" ADD FOREIGN KEY ("vote_id") REFERENCES "destinations" ("id");
