create table users (
    id serial primary key,
    username varchar(50),
    password varchar,
    email varchar(100),
    profile_pic text
)

create table surveys (
    id serial primary key,
    survey_name varchar(100),
    like_count integer,
    date integer,
    user_id integer
)

create table questions (
    id serial primary key,
    question text,
    survey_id int
)

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;


insert into users (username, password, email)
values ( ${username}, ${password}, ${email})
returning id, username, email

select * from users
where username = ${username}