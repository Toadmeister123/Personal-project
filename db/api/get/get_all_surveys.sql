select surveys.survey_name, surveys.id, surveys.responses
from surveys 
join users
on users.id = surveys.user_id

-- returning survey_name, id