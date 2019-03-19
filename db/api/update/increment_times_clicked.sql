update answers
set times_clicked = (select times_clicked
                from answers
                where id = $1) + 1
where id = $1