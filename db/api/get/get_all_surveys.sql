select * from surveys
where id = $1

select * from questions
where survey_id = $1 

select * from answers 
where survey_id = $1 and quesion_id = $2