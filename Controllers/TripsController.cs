using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Web.Http;
using Transit_App.Models;

namespace Transit_App.Controllers
{
    public class TripsController : ApiController
    {

        public IEnumerable<Trip> getAllTrips()
        {
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();

            SqlCommand command;
            SqlDataReader dataReader;
            string sql;

            sql = "SELECT * FROM njt_stops";
            command = new SqlCommand(sql, cnn);
            dataReader = command.ExecuteReader();
            var trips = new List<Trip>();
            while (dataReader.Read())
            {
                trips.Add(new Trip()
                {
                    route_id = (int)dataReader["stop_id"],
                    service_id = (int)dataReader["service_id"],
                    trip_id = (int)dataReader["trip_id"],
                    trip_headsign = (string)dataReader["trip_headsign"],
                    direction_id = (int)dataReader["direction_id"],
                    block_id = (string)dataReader["block_id"],
                    shape_id = (int)dataReader["shape_"]
                });
            }
            var options = new JsonSerializerOptions { WriteIndented = true };
            string jsonString = JsonSerializer.Serialize(trips, options);

            //Console.WriteLine(jsonString);
            return trips;
        }
    }
}
