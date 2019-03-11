select s.survey_name, s.id, q.question, a.answer, s.date
from surveys s
join questions q on s.id = q.survey_id
join answers a on q.survey_id = a.survey_id
group by s.id, q.question, a.answer
order by date asc