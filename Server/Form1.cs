using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Windows.Forms;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Server
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            btnConnect.Click += btnConnect_Click;
            btnGetRoutes.Click += btnGetRoutes_Click;
            btnGetStops.Click += btnGetStops_Click;
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void btnConnect_Click(object sender, EventArgs e)
        {
            
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();
            MessageBox.Show("Connection Open  !");
            cnn.Close();
        }

        private void btnGetRoutes_Click(object sender, EventArgs e)
        {
            //printRoutes(getRoutes());
            printJson(getRoutes());
        }

        private void btnGetStops_Click(object sender, EventArgs e)
        {
            getStops();
        }

        private void Form1_Load_1(object sender, EventArgs e)
        {

        }
        /**
         * Begin methods to retrieve data and create Json strings
         * 
         * 
         */
        public List<Route> getRoutes()
        {
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();



            SqlCommand command;
            SqlDataReader dataReader;
            string sql, Output = "";

            sql = "Select * from njt_routes";

            command = new SqlCommand(sql, cnn);

            dataReader = command.ExecuteReader();

            var Routes = new List<Route>();

            while (dataReader.Read())
            {
                Routes.Add(new Route()
                {
                    route_id = (int) dataReader["route_id"],
                    agency_id = (string)dataReader["agency_id"],
                    route_short_name = Convert.IsDBNull(dataReader["route_short_name"]) ? null : (string) dataReader["route_short_name"],
                    route_long_name =  (string)dataReader["route_long_name"],
                    route_type = (int)dataReader["route_type"],
                    route_url = Convert.IsDBNull(dataReader["route_url"]) ? null : (string) dataReader["route_url"],
                    route_color = (string)dataReader["route_color"],
                });
            }
            System.Console.WriteLine();
            return Routes;
        }

        public List<Stop> getStops()
        {
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();

            SqlCommand command;
            SqlDataReader dataReader;
            string sql, Output = "";

            sql = "SELECT * FROM njt_stops WHERE stop_desc = 'ACL' ";

            command = new SqlCommand(sql, cnn);
            dataReader = command.ExecuteReader();

            var Stops = new List<Stop>();
            while (dataReader.Read())
            {
                Stops.Add(new Stop()
                {
                    stop_id = (int)dataReader["stop_id"],
                    stop_code = (int)dataReader["stop_code"],
                    stop_name = (string)dataReader["stop_name"],
                    stop_desc = Convert.IsDBNull(dataReader["stop_desc"]) ? null : (string)dataReader["stop_desc"],
                    stop_lat = (double)dataReader["stop_lat"],
                    stop_lon = (double)dataReader["stop_lon"],
                    zone_id = (int)dataReader["zone_id"]
                });
            }
            var options = new JsonSerializerOptions { WriteIndented = true };
            string jsonString = JsonSerializer.Serialize(Stops, options);

            Console.WriteLine(jsonString);
            return Stops;
        }



        public void printRoutes(List<Route> Routes)
        {
            foreach (var Route in Routes)
            {
                System.Console.WriteLine(Route.route_id);
                System.Console.WriteLine(Route.agency_id);
                System.Console.WriteLine(Route.route_short_name);
                System.Console.WriteLine(Route.route_long_name);
                System.Console.WriteLine(Route.route_type);
                System.Console.WriteLine(Route.route_url);
                System.Console.WriteLine(Route.route_color);
            }

        }

        public void printJson(List<Route> Routes)
        {
            var options = new JsonSerializerOptions { WriteIndented = true };
            string jsonString = JsonSerializer.Serialize(Routes, options);

            Console.WriteLine(jsonString);
        }

        private void button3_Click(object sender, EventArgs e)
        {

        }
    }
}
