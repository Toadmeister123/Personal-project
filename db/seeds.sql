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


select row_to_json(s)
from(
  select id, survey_name,
    (
      select array_to_json(array_agg(row_to_json(q)))
        from (
          select question,
            (
              select array_to_json(array_agg(row_to_json(a)))
                from(
                  select answer
                  from answers
                  where question_id = questions.id
                ) a 
            ) as answers
          from questions
          where survey_id = surveys.id
        ) q 
    ) as questions
  from surveys
  where id = $1
)s 
