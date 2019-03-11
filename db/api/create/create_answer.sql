insert into answers (answer, survey_id, question_id)
values ($1, $2, $3)

returning *
