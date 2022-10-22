using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Routing;
using Transit_App.Models;
using JsonSerializer = System.Text.Json.JsonSerializer;
using Route = Transit_App.Models.Route;

namespace Transit_App.Controllers
{
    public class RoutesController : ApiController
    {
        public IEnumerable<Route> getAllRoutes()
        {
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();

            SqlCommand command;
            SqlDataReader dataReader;
            string sql;

            sql = "SELECT * FROM njt_routes";

            command = new SqlCommand(sql, cnn);

            dataReader = command.ExecuteReader();

            var Routes = new List<Route>();

            while (dataReader.Read())
            {
                Routes.Add(new Route()
                {
                    route_id = (int)dataReader["route_id"],
                    agency_id = (string)dataReader["agency_id"],
                    route_short_name = Convert.IsDBNull(dataReader["route_short_name"]) ? null : (string)dataReader["route_short_name"],
                    route_long_name = (string)dataReader["route_long_name"],
                    route_type = (int)dataReader["route_type"],
                    route_url = Convert.IsDBNull(dataReader["route_url"]) ? null : (string)dataReader["route_url"],
                    route_color = (string)dataReader["route_color"],
                });
            }
           
            //var options = new JsonSerializerOptions { WriteIndented = true };
           // string jsonString = JsonSerializer.Serialize(Routes, options);
            cnn.Close();
            //Console.WriteLine(jsonString);
            return Routes;
        }

        public Route getRoute(string routeName)
        {
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();

            SqlCommand command;
            SqlDataReader dataReader;
            string sql;

            sql = $"SELECT * FROM njt_routes WHERE route_short_name={routeName}";

            command = new SqlCommand(sql, cnn);
            dataReader = command.ExecuteReader();
            Route result = new Route();
            
            while (dataReader.Read()) {
                {
                    result.route_id = (int)dataReader["stop_id"];
                    result.agency_id = (string)dataReader["agency_id"];
                    result.route_short_name = (string)dataReader["route_short_name"];
                    result.route_long_name = (string)dataReader["route_long_name"];
                    result.route_type = (int)dataReader["route_type"];
                    result.route_url = Convert.IsDBNull(dataReader["route_url"]) ? null : (string)dataReader["route_url"];
                    result.route_color = (string)dataReader["route_color"];
                };
            }
            //var options = new JsonSerializerOptions { WriteIndented = true };
           // string jsonString = System.Text.Json.JsonSerializer.Serialize(result, options);

           // Console.WriteLine(jsonString);
           cnn.Close();
            return result;
        } 

        public Route getRouteById(int id)
        {
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();

            SqlCommand command;
            SqlDataReader dataReader;
            string sql;

            sql = $"SELECT * FROM njt_routes WHERE route_id={id}";

            command = new SqlCommand(sql, cnn);
            dataReader = command.ExecuteReader();
            Route result = new Route();

            while (dataReader.Read())
            {
                {
                    result.route_id = (int)dataReader["stop_id"];
                    result.agency_id = (string)dataReader["agency_id"];
                    result.route_short_name = (string)dataReader["route_short_name"];
                    result.route_long_name = (string)dataReader["route_long_name"];
                    result.route_type = (int)dataReader["route_type"];
                    result.route_url = Convert.IsDBNull(dataReader["route_url"]) ? null : (string)dataReader["route_url"];
                    result.route_color = (string)dataReader["route_color"];
                };
            }
            //var options = new JsonSerializerOptions { WriteIndented = true };
            //string jsonString = System.Text.Json.JsonSerializer.Serialize(result, options);

            //Console.WriteLine(jsonString);
            cnn.Close();
            return result;
        }
    }
}
