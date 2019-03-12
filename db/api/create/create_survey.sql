insert into surveys (survey_name, date, user_id)
values ($1, $2, $3)

returning *
