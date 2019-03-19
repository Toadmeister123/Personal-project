update surveys
set survey_name = $1
where id = $2;

-- select s.survey_name
-- from surveys s
-- where id = $1

-- update questions 
-- set question = $3
-- where survey_id = $1 and question_id = $4;

-- update answers
-- set answer = $5
-- where survey_id = $1 and question_id = $4 ;