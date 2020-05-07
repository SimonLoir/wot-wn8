#UPDATE snapshots SET `date` = CAST(FROM_UNIXTIME(`time`) AS DATE)
SELECT MAX(id) AS id, `date`
FROM snapshots 
WHERE pid = 529721740
GROUP BY `date`
