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
    public class StopController : ApiController
    {
       

        public IEnumerable<Stop> getAllStops()
        {
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();

            SqlCommand command;
            SqlDataReader dataReader;
            string sql;

            sql = $"SELECT * FROM septa_stops";
            command = new SqlCommand(sql, cnn);
            dataReader = command.ExecuteReader();
            var stops = new List<Stop>();
            while (dataReader.Read())
            {
                stops.Add(new Stop()
                {
                    stop_id = (int)dataReader["stop_id"],
                    stop_code = Convert.IsDBNull(dataReader["stop_code"]) ? null : (string)dataReader["stop_code"],
                    stop_name = (string)dataReader["stop_name"],
                    stop_desc = Convert.IsDBNull(dataReader["stop_desc"]) ? null : (string)dataReader["stop_desc"],
                    stop_lat = (double)dataReader["stop_lat"],
                    stop_lon = (double)dataReader["stop_lon"],
                    zone_id = (string)dataReader["zone_id"]
                });
            }
            var options = new JsonSerializerOptions { WriteIndented = true };
            string jsonString = JsonSerializer.Serialize(stops, options);

            Console.WriteLine(jsonString);
            cnn.Close();
            return stops;
        }

        public List<Stop> getStopsByRoute(string stopDesc)
        {
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();

            SqlCommand command;
            SqlDataReader dataReader;
            string sql;

            sql = $"SELECT * FROM njt_stops WHERE stop_desc={stopDesc}";
            command = new SqlCommand(sql, cnn);
            dataReader = command.ExecuteReader();
            var Stops = new List<Stop>();
            while (dataReader.Read())
            {
                Stops.Add(new Stop()
                {
                    stop_id = (int)dataReader["stop_id"],
                    stop_code = Convert.IsDBNull(dataReader["stop_code"]) ? null : (string)dataReader["stop_code"],
                    stop_name = (string)dataReader["stop_name"],
                    stop_desc = Convert.IsDBNull(dataReader["stop_desc"]) ? null : (string)dataReader["stop_desc"],
                    stop_lat = (double)dataReader["stop_lat"],
                    stop_lon = (double)dataReader["stop_lon"],
                    zone_id = (string)dataReader["zone_id"]
                });
            }
            //var options = new JsonSerializerOptions { WriteIndented = true };
            // string jsonString = JsonSerializer.Serialize(Stops, options);

            // Console.WriteLine(jsonString);
            cnn.Close();
            return Stops;
        }

        public IEnumerable<Stop> getStopsByAgency(string agency)
        {
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();

            SqlCommand command;
            SqlDataReader dataReader;
            string sql;

            sql = $"SELECT * FROM {agency}_stops";
            command = new SqlCommand(sql, cnn);
            dataReader = command.ExecuteReader();
            var stops = new List<Stop>();
            while (dataReader.Read())
            {
                stops.Add(new Stop()
                {
                    stop_id = (int)dataReader["stop_id"],
                    stop_code = Convert.IsDBNull(dataReader["stop_code"]) ? null : (string)dataReader["stop_code"],
                    stop_name = (string)dataReader["stop_name"],
                    stop_desc = Convert.IsDBNull(dataReader["stop_desc"]) ? null : (string)dataReader["stop_desc"],
                    stop_lat = (double)dataReader["stop_lat"],
                    stop_lon = (double)dataReader["stop_lon"],
                    zone_id = (string)dataReader["zone_id"]
                });
            }
            //var options = new JsonSerializerOptions { WriteIndented = true };
            //string jsonString = JsonSerializer.Serialize(stops, options);

            //Console.WriteLine(jsonString);
            cnn.Close();
            return stops;
        }
    }
}
