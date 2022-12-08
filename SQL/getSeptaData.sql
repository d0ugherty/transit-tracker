TRUNCATE TABLE dbo.septa_calendar_dates

BULK INSERT dbo.septa_calendar_dates
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\septa\data\calendar_dates.csv'
WITH
(
	FORMAT='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
)

GO

SELECT * FROM dbo.septa_calendar_dates

TRUNCATE TABLE dbo.septa_stop_times

BULK INSERT dbo.septa_stop_times
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\septa\data\stop_times.csv'
WITH
(
	FORMAT='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
)

GO

SELECT * FROM dbo.septa_stop_times

TRUNCATE TABLE dbo.septa_routes

BULK INSERT dbo.septa_routes
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\septa\data\routes.csv'
WITH
(
	FORMAT='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
)

GO

SELECT * FROM dbo.septa_routes

TRUNCATE TABLE dbo.septa_shapes

BULK INSERT dbo.septa_shapes
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\septa\data\shapes.csv'
WITH
(
	FORMAT='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
)

GO

SELECT * FROM dbo.septa_shapes

TRUNCATE TABLE dbo.septa_stops

BULK INSERT dbo.septa_stops
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\septa\data\stops.csv'
WITH
(
	FORMAT='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
)

GO

SELECT * FROM dbo.septa_stops

TRUNCATE TABLE dbo.septa_trips

BULK INSERT dbo.septa_trips
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\septa\data\trips.csv'
WITH
(
	FORMAT='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
)

GO

SELECT * FROM dbo.septa_trips