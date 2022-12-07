TRUNCATE TABLE dbo.njt_routes

BULK INSERT dbo.njt_routes
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\njt\data\routes.csv'
WITH
(
	FORMAT='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
)

GO

SELECT * FROM dbo.njt_routes


TRUNCATE TABLE dbo.njt_shapes

BULK INSERT dbo.njt_shapes
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\njt\data\shapes.csv'
WITH
(
	FORMAT='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
)
GO

SELECT * FROM dbo.njt_shapes

TRUNCATE TABLE dbo.njt_stop_times

BULK INSERT dbo.njt_stop_times
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\njt\data\stop_times.csv'
WITH
(
	FORMAT='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
)
GO
SELECT * FROM dbo.njt_stop_times

TRUNCATE TABLE dbo.njt_stops

BULK INSERT dbo.njt_stops
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\njt\data\stops.csv'
WITH
(
	FORMAT='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
)
GO
SELECT * FROM dbo.njt_stops

TRUNCATE TABLE dbo.njt_trips

BULK INSERT dbo.njt_trips
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\njt\data\trips.csv'
WITH
(
	FORMAT='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
)
GO
SELECT * FROM dbo.njt_trips

TRUNCATE TABLE dbo.njt_calendar_dates

BULK INSERT dbo.njt_calendar_dates
FROM 'C:\Users\tdoug\source\repos\transit-tracker\gtfs_data\njt\data\calendar_dates.csv'
WITH
(
	FORMAT='CSV',
	FIRSTROW=2,
	ROWTERMINATOR='0x0a'
)
GO
SELECT * FROM dbo.njt_calendar_dates