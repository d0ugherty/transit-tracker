using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Text.Json;

namespace Server
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            btnConnect.Click += btnConnect_Click;
            btnGetRoutes.Click += btnGetRoutes_Click;
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

        private void btnGetRoutes_Click(object sender, EventArgs e) {
            
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();
           
            

            SqlCommand command;
            SqlDataReader dataReader;
            String sql, Output = "";

            sql = "Select * from njt_routes";

            command = new SqlCommand(sql, cnn);

            dataReader = command.ExecuteReader();

            var Routes = new List<Route>();

            while (dataReader.Read())
            {
                Routes.Add(new Route()
                {
                    route_id = (int)dataReader.GetValue(0),
                    agency_id = (string)dataReader.GetValue(1),
                    route_short_name = (string)dataReader.GetValue(2),
                    route_long_name = (string)dataReader.GetValue(3),
                    route_type = (int)dataReader.GetValue(4),
                    route_url = (string)dataReader.GetValue(5),
                    route_color = (string)dataReader.GetValue(6),
                });
            }
            MessageBox.Show(Output);

        }

        private void Form1_Load_1(object sender, EventArgs e)
        {

        }
    }
}
