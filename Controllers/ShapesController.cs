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
    [RoutePrefix("api/shapes")]
    public class ShapesController : ApiController
    {

        [HttpGet]
        [Route("")]
        public IEnumerable<Shape> GetAllShapes()
        {
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();

            SqlCommand command;
            SqlDataReader dataReader;
            string sql;

            sql = "SELECT * FROM all_shapes";
            command = new SqlCommand(sql, cnn);
            dataReader = command.ExecuteReader();
            var shapes = new List<Shape>();
            while (dataReader.Read())
            {
                shapes.Add(new Shape()
                {
                    shape_id = (int)dataReader["shape_id"],
                    shape_pt_lat = (double)dataReader["shape_pt_lat"],
                    shape_pt_lon = (double)dataReader["shape_pt_lon"],
                    shape_pt_sequence = (int)dataReader["shape_pt_sequence"],
                    shape_dist_traveled = Convert.IsDBNull(dataReader["shape_dist_traveled"]) ? 0 : (double)dataReader["shape_dist_traveled"]
                });
            }
            cnn.Close();
            dataReader.Close();
            return shapes;
        }
        [HttpGet]
        [Route("{agency}")]
        public IEnumerable<Shape> GetShapesByAgency([FromUri] string agency)
        {
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();

            SqlCommand command;
            SqlDataReader dataReader;
            string sql;

            sql = $"SELECT * FROM {agency}_shapes";
            command = new SqlCommand(sql, cnn);
            dataReader = command.ExecuteReader();
            var shapes = new List<Shape>();
            while (dataReader.Read())
            {
                shapes.Add(new Shape()
                {
                    shape_id = (int)dataReader["shape_id"],
                    shape_pt_lat = (double)dataReader["shape_pt_lat"],
                    shape_pt_lon = (double)dataReader["shape_pt_lon"],
                    shape_pt_sequence = (int)dataReader["shape_pt_sequence"],
                    shape_dist_traveled = Convert.IsDBNull(dataReader["shape_dist_traveled"]) ? 0 : (double)dataReader["shape_dist_traveled"]
                });
            }
            cnn.Close();
            dataReader.Close();
            return shapes;
        }
        [HttpGet]
        [Route("{agency}/{routeId}")]
        public IEnumerable<Shape> GetShapeByRoute([FromUri] string agency, [FromUri] string routeId)
        {
            {
                string connectionString;
                SqlConnection cnn;
                connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
                cnn = new SqlConnection(connectionString);
                cnn.Open();

                SqlCommand command;
                SqlDataReader dataReader;
                string sql;
                int shapeId;
                var shapes = new List<Shape>();

                sql = $"SELECT shape_id FROM {agency}_routes_shapes WHERE [dbo.{agency}_routes.route_id]='{routeId}'";
                command = new SqlCommand(sql, cnn);
                dataReader = command.ExecuteReader();
                if (dataReader.Read())
                {
                    shapeId = (int)dataReader["shape_id"];
                    dataReader.Close();
                    sql = $"SELECT * FROM {agency}_shapes WHERE shape_id='{shapeId}'";
                    command = new SqlCommand(sql, cnn);
                    dataReader = command.ExecuteReader();
                    while (dataReader.Read())
                    {
                        shapes.Add(new Shape()
                        {
                            shape_id = (int)dataReader["shape_id"],
                            shape_pt_lat = (double)dataReader["shape_pt_lat"],
                            shape_pt_lon = (double)dataReader["shape_pt_lon"],
                            shape_pt_sequence = (int)dataReader["shape_pt_sequence"],
                            shape_dist_traveled = Convert.IsDBNull(dataReader["shape_dist_traveled"]) ? 0 : (double)dataReader["shape_dist_traveled"]
                        });
                    }
                    dataReader.Close();
                    return shapes;
                }
                else
                {
                    dataReader.Close();
                    return shapes;
                }
            }
        }
    }
}
