BULK INSERT septa_stops_AIR
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\septa\lines\AIR.csv'
WITH (
	FORMAT ='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
	)
	SELECT * FROM septa_stops_AIR
	GO

BULK INSERT septa_stops_CHE
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\septa\lines\CHE.csv'
WITH (
	FORMAT ='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
	)
SELECT * FROM septa_stops_CHE
GO

BULK INSERT septa_stops_CHW
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\septa\lines\CHW.csv'
WITH (
	FORMAT ='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
	)
SELECT * FROM septa_stops_CHW
GO

BULK INSERT septa_stops_CYN
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\septa\lines\CYN.csv'
WITH (
	FORMAT ='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
	)
SELECT * FROM septa_stops_CYN
GO

BULK INSERT septa_stops_FOX
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\septa\lines\FOX.csv'
WITH (
	FORMAT ='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
	)
SELECT * FROM septa_stops_FOX
GO

BULK INSERT septa_stops_GLN
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\septa\lines\GLN.csv'
WITH (
	FORMAT ='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
	)
SELECT * FROM septa_stops_GLN
GO

BULK INSERT septa_stops_LAN
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\septa\lines\LAN.csv'
WITH (
	FORMAT ='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
	)
SELECT * FROM septa_stops_LAN
GO

BULK INSERT septa_stops_MAN
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\septa\lines\MAN.csv'
WITH (
	FORMAT ='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
	)
SELECT * FROM septa_stops_MAN
GO

BULK INSERT septa_stops_MED
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\septa\lines\MED.csv'
WITH (
	FORMAT ='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
	)
SELECT * FROM septa_stops_MED
GO

BULK INSERT septa_stops_PAO
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\septa\lines\PAO.csv'
WITH (
	FORMAT ='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
	)
SELECT * FROM septa_stops_PAO
GO

BULK INSERT septa_stops_TRE
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\septa\lines\TRE.csv'
WITH (
	FORMAT ='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
	)
SELECT * FROM septa_stops_TRE
GO

BULK INSERT septa_stops_WAR
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\septa\lines\WAR.csv'
WITH (
	FORMAT ='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
	)
SELECT * FROM septa_stops_WAR
GO

BULK INSERT septa_stops_WIL
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\septa\lines\WIL.csv'
WITH (
	FORMAT ='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
	)
SELECT * FROM septa_stops_WIL
GO

BULK INSERT septa_stops_WTR
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\septa\lines\WTR.csv'
WITH (
	FORMAT ='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
	)
SELECT * FROM septa_stops_WTR
GO