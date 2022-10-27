TRUNCATE TABLE routes_trips
TRUNCATE TABLE routes_shapes
INSERT INTO routes_trips
	SELECT *
	FROM septa_routes
		INNER JOIN septa_trips
		ON dbo.septa_routes.route_id = dbo.septa_trips.route_id

INSERT INTO routes_shapes 
	SELECT DISTINCT
		[septa_routes.route_id],
		route_short_name,
		route_long_name,
		agency_id,
		routes_trips.shape_id
		FROM routes_trips	
			INNER JOIN septa_shapes
		ON septa_shapes.shape_id = routes_trips.shape_id

	SELECT DISTINCT * FROM septa_shapes	
			INNER JOIN routes_shapes
				ON routes_shapes.shape_id = septa_shapes.shape_id
			ORDER BY septa_shapes.shape_id
	GO