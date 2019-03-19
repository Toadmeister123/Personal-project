insert into answers (answer, survey_id, question_id, times_clicked)
values ($1, $2, $3, 0)

returning *
