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
    [RoutePrefix("api/routes")]
    public class RoutesController : ApiController
    {
        // Get all routes
        [HttpGet]
        [Route("")]
        public IEnumerable<Route> Get()
        {
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();

            SqlCommand command;
            SqlDataReader dataReader;
            string sql;
            //Update this
            sql = "SELECT * FROM all_routes";

            command = new SqlCommand(sql, cnn);

            dataReader = command.ExecuteReader();

            var Routes = new List<Route>();

            while (dataReader.Read())
            {
                Routes.Add(new Route()
                {
                    route_id = (string)dataReader["route_id"],
                    agency_id = (string)dataReader["agency_id"],
                    route_short_name = Convert.IsDBNull(dataReader["route_short_name"]) ? null : (string)dataReader["route_short_name"],
                    route_long_name = (string)dataReader["route_long_name"],
                    route_desc = Convert.IsDBNull(dataReader["route_desc"]) ? null : (string)dataReader["route_url"],
                    route_type = (string)dataReader["route_type"],
                    route_url = Convert.IsDBNull(dataReader["route_url"]) ? null : (string)dataReader["route_url"],
                    route_text_color = Convert.IsDBNull(dataReader["route_text_color"]) ? null : (string)dataReader["route_text_color"],
                    route_color = Convert.IsDBNull(dataReader["route_color"]) ? null : (string)dataReader["route_color"],
                });
            }
            cnn.Close();
            return Routes;
        }

        //Get routes by agency
        [HttpGet]
        [Route("{agency}")]
        public IEnumerable<Route> Get([FromUri] string agency)
        {
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();

            SqlCommand command;
            SqlDataReader dataReader;
            string sql;
            //Update this
            sql = $"SELECT * FROM {agency}_routes";

            command = new SqlCommand(sql, cnn);

            dataReader = command.ExecuteReader();

            var Routes = new List<Route>();

            while (dataReader.Read())
            {
                Routes.Add(new Route()
                {
                    route_id = (string)dataReader["route_id"],
                    agency_id = (string)dataReader["agency_id"],
                    route_short_name = Convert.IsDBNull(dataReader["route_short_name"]) ? null : (string)dataReader["route_short_name"],
                    route_long_name = (string)dataReader["route_long_name"],
                    route_desc = Convert.IsDBNull(dataReader["route_desc"]) ? null : (string)dataReader["route_desc"],
                    route_type = (string)dataReader["route_type"],
                    route_url = Convert.IsDBNull(dataReader["route_url"]) ? null : (string)dataReader["route_url"],
                    route_text_color = Convert.IsDBNull(dataReader["route_text_color"]) ? null : (string)dataReader["route_text_color"],
                    route_color = Convert.IsDBNull(dataReader["route_color"]) ? null : (string)dataReader["route_color"],
                });
            }
            cnn.Close();
            return Routes;
        }

        /*[HttpGet]
        [Route("{agency}/{routeName}")]
        public Route GetByName([FromUri] string agency, [FromUri] string routeName)
        {
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();

            SqlCommand command;
            SqlDataReader dataReader;
            string sql;

            sql = $"SELECT * FROM {agency}_routes WHERE {routeName}= route_short_name";

            command = new SqlCommand(sql, cnn);
            dataReader = command.ExecuteReader();
            Route result = new Route();

            while (dataReader.Read())
            {
                {
                    result.route_id = (string)dataReader["stop_id"];
                    result.agency_id = (string)dataReader["agency_id"];
                    result.route_short_name = (string)dataReader["route_short_name"];
                    result.route_long_name = (string)dataReader["route_long_name"];
                    result.route_desc = Convert.IsDBNull(dataReader["route_desc"]) ? null : (string)dataReader["route_desc"];
                    result.route_type = (string)dataReader["route_type"];
                    result.route_url = Convert.IsDBNull(dataReader["route_url"]) ? null : (string)dataReader["route_url"];
                    result.route_text_color = Convert.IsDBNull(dataReader["route_text_color"]) ? null : (string)dataReader["route_text_color"];
                    result.route_color = Convert.IsDBNull(dataReader["route_color"]) ? null : (string)dataReader["route_color"];
                };
            }
            cnn.Close();
            return result;
        }*/

        [HttpGet]
        [Route("{agency}/{routeId}")]
        public Route GetById([FromUri] string agency, [FromUri] string routeId)
        {
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();

            SqlCommand command;
            SqlDataReader dataReader;
            string sql;

            sql = $"SELECT * FROM {agency}_routes WHERE route_id={routeId}";

            command = new SqlCommand(sql, cnn);
            dataReader = command.ExecuteReader();
            Route result = new Route();

            while (dataReader.Read())
            {
                {
                    result.route_id = (string)dataReader["stop_id"];
                    result.agency_id = (string)dataReader["agency_id"];
                    result.route_short_name = (string)dataReader["route_short_name"];
                    result.route_long_name = (string)dataReader["route_long_name"];
                    result.route_desc = Convert.IsDBNull(dataReader["route_desc"]) ? null : (string)dataReader["route_desc"];
                    result.route_type = (string)dataReader["route_type"];
                    result.route_url = Convert.IsDBNull(dataReader["route_url"]) ? null : (string)dataReader["route_url"];
                    result.route_text_color = Convert.IsDBNull(dataReader["route_text_color"]) ? null : (string)dataReader["route_text_color"];
                    result.route_color = Convert.IsDBNull(dataReader["route_color"]) ? null : (string)dataReader["route_color"];
                };
            }
            cnn.Close();
            return result;
        }
    }
}
