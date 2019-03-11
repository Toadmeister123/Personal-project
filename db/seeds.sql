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

create table answers (
    id serial primary key,
    answer text,
    survey_id int
    question_id
)

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

insert into surveys (survey_name, date)
values ($1, $2)
returning *

insert into questions (question, survey_id)
values ($1, $2)
returning *

insert into answers (answer, survey_id, question_id)
values ($1, $2, $3)
returning *


select s.survey_name, q.question, a.answer, s.date
from surveys s
join questions q on s.id = q.survey_id
join answers a on q.survey_id = a.survey_id
order by date asc