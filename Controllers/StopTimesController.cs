using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Transit_App.Models;

namespace Transit_App.Controllers
{
    public class StopTimesController : ApiController
    {
        public IEnumerable<StopTime> getAllStopTimes()
        {
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();

            SqlCommand command;
            SqlDataReader dataReader;
            string sql;

            sql = "SELECT * FROM njt_stop_times";

            command = new SqlCommand(sql, cnn);

            dataReader = command.ExecuteReader();

            var times = new List<StopTime>();

            while (dataReader.Read())
            {
                times.Add(new StopTime()
                {
                    trip_id = (int)dataReader["trip_id"],
                    arrival_time = (string)dataReader["arrival_time"],
                    departure_time = (string)dataReader["departure_time"],
                    stop_id = (int)dataReader["stop_id"],
                    stop_sequence = (int)dataReader["stop_sequence"],
                    pickup_type = (int)dataReader["pickup_type"],
                    drop_off_type = (int)dataReader["drop_off_type"],
                    shape_dist_traveled = (int)dataReader["shape_dist_traveled"]
                });
            }

            //var options = new JsonSerializerOptions { WriteIndented = true };
            // string jsonString = JsonSerializer.Serialize(Routes, options);
            cnn.Close();
            //Console.WriteLine(jsonString);
            return times;
        }

        public IEnumerable<StopTime> getStopTimesByTrip(int tripId)
        {
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();

            SqlCommand command;
            SqlDataReader dataReader;
            string sql;

            sql = $"SELECT * FROM njt_stop_times WHERE trip_id={tripId}";

            command = new SqlCommand(sql, cnn);

            dataReader = command.ExecuteReader();

            var times = new List<StopTime>();

            while (dataReader.Read())
            {
                times.Add(new StopTime()
                {
                    trip_id = (int)dataReader["trip_id"],
                    arrival_time = (string)dataReader["arrival_time"],
                    departure_time = (string)dataReader["departure_time"],
                    stop_id = (int)dataReader["stop_id"],
                    stop_sequence = (int)dataReader["stop_sequence"],
                    pickup_type = (int)dataReader["pickup_type"],
                    drop_off_type = (int)dataReader["drop_off_type"],
                    shape_dist_traveled = (int)dataReader["shape_dist_traveled"]
                });
            }

            //var options = new JsonSerializerOptions { WriteIndented = true };
            // string jsonString = JsonSerializer.Serialize(Routes, options);
            cnn.Close();
            //Console.WriteLine(jsonString);
            return times;
        }

        public IEnumerable<StopTime> getStopTimesByStop(int stopId)
        {
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();

            SqlCommand command;
            SqlDataReader dataReader;
            string sql;

            sql = $"SELECT * FROM njt_stop_times WHERE stop_id={stopId}";

            command = new SqlCommand(sql, cnn);

            dataReader = command.ExecuteReader();

            var times = new List<StopTime>();

            while (dataReader.Read())
            {
                times.Add(new StopTime()
                {
                    trip_id = (int)dataReader["trip_id"],
                    arrival_time = (string)dataReader["arrival_time"],
                    departure_time = (string)dataReader["departure_time"],
                    stop_id = (int)dataReader["stop_id"],
                    stop_sequence = (int)dataReader["stop_sequence"],
                    pickup_type = (int)dataReader["pickup_type"],
                    drop_off_type = (int)dataReader["drop_off_type"],
                    shape_dist_traveled = (int)dataReader["shape_dist_traveled"]
                });
            }

            //var options = new JsonSerializerOptions { WriteIndented = true };
            // string jsonString = JsonSerializer.Serialize(Routes, options);
            cnn.Close();
            //Console.WriteLine(jsonString);
            return times;
        }
    }
}
