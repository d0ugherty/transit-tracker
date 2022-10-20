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
    public class ShapesController : ApiController
    {

        public IEnumerable<Shape> getAllShapes()
        {
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();

            SqlCommand command;
            SqlDataReader dataReader;
            string sql;

            sql = "SELECT * FROM njt_shapes";
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
                    shape_dist_traveled = (double)dataReader["shape_dist_traveled"]
                });
            }
            var options = new JsonSerializerOptions { WriteIndented = true };
            string jsonString = JsonSerializer.Serialize(shapes, options);

            //Console.WriteLine(jsonString);
            cnn.Close();
            return shapes;
        }

        public IEnumerable<Shape> getShapeById(int shapeId)
        {
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();

            SqlCommand command;
            SqlDataReader dataReader;
            string sql;

            sql = $"SELECT * FROM njt_shapes WHERE shape_id={shapeId}";
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
                    shape_dist_traveled = (double)dataReader["shape_dist_traveled"]
                });
            }
            var options = new JsonSerializerOptions { WriteIndented = true };
            string jsonString = JsonSerializer.Serialize(shapes, options);

            //Console.WriteLine(jsonString);
            cnn.Close();
            return shapes;
        }
    }
}
