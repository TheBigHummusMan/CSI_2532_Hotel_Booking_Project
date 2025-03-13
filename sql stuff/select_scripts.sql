-----------------------------------------
-- To see chain's emails and locations --
-----------------------------------------
SELECT e.email, c.nomdechaine, a.ville
FROM emailchaine e
JOIN chainehoteliere c ON e.nomdechaine = c.nomdechaine
JOIN address a ON c.addressid = a.addressid
order by a.ville;