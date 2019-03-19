select row_to_json(s)
from(
  select id, survey_name,
    (
      select array_to_json(array_agg(row_to_json(q)))
        from (
          select question, id,
            (
              select array_to_json(array_agg(row_to_json(a)))
                from(
                  select id, answer
                  from answers
                  where question_id = questions.id
                ) a 
            ) as answers
          from questions
          where survey_id = surveys.id
        ) q 
    ) as questions
  from surveys
  where user_id = $1
)s 