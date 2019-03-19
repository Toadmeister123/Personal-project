delete from surveys 
where id = $1;

delete from questions 
where survey_id = $1;

delete from answers
where survey_id = $1;