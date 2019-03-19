update surveys
set responses = (select responses
                from surveys
                where id = $1) + 1
where id = $1