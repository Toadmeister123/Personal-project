-- select s.user_id, u.id, s.survey_name
-- from surveys s
-- join users u 
-- on s.user_id = u.id

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
  -- where id = 72
)s 