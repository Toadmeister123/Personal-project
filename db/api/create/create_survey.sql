insert into surveys (survey_name, date, user_id, responses)
values ($1, $2, $3, 0)

returning *
