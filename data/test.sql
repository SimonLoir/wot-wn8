#: used to get get date
#UPDATE snapshots SET `date` = CAST(FROM_UNIXTIME(`time`) AS DATE)

#: used to get all the stats but one per day
#SELECT MAX(id) AS id
#FROM snapshots 
#WHERE pid = 529721740
#GROUP BY `date`

#: used to 
SELECT * FROM snapshots_data sd, snapshots s 
WHERE 
sd.id = s.id
AND s.pid = 529721740
AND tank_id = 9473