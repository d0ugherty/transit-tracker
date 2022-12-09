using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Transit_App.Models;

namespace Transit_App.Controllers
{
    [RoutePrefix("api/stop")]
    public class StopController : ApiController
    {
        // GET api/stop/?agency={agency}&?routeId={routeId}
        [HttpGet]
        [Route("{agency}/{routeId}")]
        public IEnumerable<Stop> Get([FromUri] string agency, [FromUri] string routeId)
        {
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();

            SqlCommand command;
            SqlDataReader dataReader;
            string sql;

            sql = $"SELECT * FROM {agency}_stops_{routeId}";
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
            cnn.Close();
            return Stops;
        }
        // GET api/stop/
        [HttpGet]
        [Route("")]
        public IEnumerable<Stop> Get()
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
            cnn.Close();
            return stops;
        }

        // GET api/stop/{agency}
        [HttpGet]
        [Route("{agency}")]

        public IEnumerable<Stop> Get([FromUri] string agency)
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
            cnn.Close();
            return stops;
        }
    }
}
