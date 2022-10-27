TRUNCATE TABLE routes_trips
DROP TABLE shapes_test
INSERT INTO routes_trips
	SELECT *
	FROM septa_routes
		INNER JOIN septa_trips
		ON dbo.septa_routes.route_id = dbo.septa_trips.route_id
		SELECT DISTINCT 
		[dbo.septa_routes.route_id],
		route_short_name,
		route_long_name,
		agency_id,
		routes_trips.shape_id
		INTO shapes_test
			FROM routes_trips	
				INNER JOIN septa_shapes
		ON septa_shapes.shape_id = routes_trips.shape_id
		SELECT DISTINCT * FROM septa_shapes	
			INNER JOIN shapes_test
				ON shapes_test.shape_id = septa_shapes.shape_id
			ORDER BY [dbo.septa_routes.route_id]
	GO
