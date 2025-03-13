---------- node nomor 3 saya menggunakan seeder script ada di dalam folder project --------
----------  jawaban nomor 4 -------

SELECT 
    emp.id AS "employee_id",
    emp.nik,
    emp.name,
    emp.is_active,
    ep.gender,
    COALESCE(
        EXTRACT(YEAR FROM AGE(NOW(), ep.date_of_birth::DATE))::TEXT || ' Year Old', 
        'Year Old'
    ) AS age,
    e.name AS "school_name",
    e.level,
    STRING_AGG(
        COALESCE(efm.total::text || ' ' || efm.status, 'Unknown'), 
        ' & ' ORDER BY efm.total
    ) AS "family_data"
FROM 
    employee emp
LEFT JOIN employee_profile ep 
    ON emp.id = ep.employee_id
LEFT JOIN education e 
    ON emp.id = e.employee_id
LEFT JOIN (
    SELECT 
        ef.employee_id,
        COUNT(ef.id) AS total, 
        ef.relation_status::text AS status
    FROM employee_family ef 
    GROUP BY ef.employee_id, ef.relation_status
) efm 
    ON emp.id = efm.employee_id
GROUP BY 
    emp.id, ep.gender, ep.date_of_birth, e.name, e.level;
