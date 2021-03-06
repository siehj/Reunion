
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

CREATE TABLE "itenerary" (
  "id" SERIAL,
  "day" VARCHAR(10),
  PRIMARY KEY ("id")
); 

CREATE TABLE "itenerary_items" (
  "id" SERIAL,
  "name" VARCHAR(50),
  "location" VARCHAR(100),
  "url" VARCHAR(200),
  "day_id" INTEGER,
  PRIMARY KEY ("id")
);

CREATE TABLE "voting_topics" (
  "id" SERIAL,
  "title" VARCHAR(50),
  "summary" VARCHAR(100),
  PRIMARY KEY ("id")
);

CREATE TABLE "voting_items" (
  "id" SERIAL,
  "name" VARCHAR(50),
  "location" VARCHAR(100),
  "votes" INTEGER,
  "url" VARCHAR(200),
  "topic_id" INTEGER,
  PRIMARY KEY ("id")
);

CREATE TABLE "users_voting" (
  "id" SERIAL,
  "user_id" INTEGER,
  "item_id" INTEGER,
  PRIMARY KEY ("id")
);

ALTER TABLE "itenerary_items" ADD FOREIGN KEY ("day_id") REFERENCES "itenerary" ("id");
ALTER TABLE "voting_items" ADD FOREIGN KEY ("topic_id") REFERENCES "voting_topics" ("id");
ALTER TABLE "users_voting" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "users_voting" ADD FOREIGN KEY ("item_id") REFERENCES "voting_items" ("id");
-- ALTER TABLE "users" ADD FOREIGN KEY ("vote_id") REFERENCES "destinations" ("id");
